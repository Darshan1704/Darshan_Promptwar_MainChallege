'use server';

import { createClient } from '@/lib/supabase/server';
import { buildCoachingPrompt } from '@/core/aiPromptBuilder';
import { calculateStreak, calculateCompletionRate } from '@/core/habitScoring';

// Sanitize API key — replaces any en/em dashes (copy-paste artifacts) with regular hyphens
function sanitizeKey(key: string): string {
  return key
    .replace(/\u2013/g, '-') // en dash –
    .replace(/\u2014/g, '-') // em dash —
    .replace(/\u2012/g, '-') // figure dash ‒
    .replace(/[^\x20-\x7E]/g, '') // remove any other non-printable/non-ASCII chars
    .trim();
}

async function callGemma4(prompt: string): Promise<string> {
  const rawKey = process.env.OPENROUTER_API_KEY || '';
  const apiKey = sanitizeKey(rawKey);

  if (!apiKey) throw new Error('OPENROUTER_API_KEY is not set in .env.local');

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'BreakFree',
    }),
    body: JSON.stringify({
      model: 'google/gemma-3-12b-it', // Matches working python script
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`OpenRouter error (${res.status}): ${errBody}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error('The AI returned an empty response. Please try again.');
  return text;
}

export async function generateAICoachingAction(habitId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data: habit } = await supabase
    .from('habits')
    .select('*')
    .eq('id', habitId)
    .single();

  const { data: logs } = await supabase
    .from('habit_logs')
    .select('*')
    .eq('habit_id', habitId)
    .order('log_date', { ascending: false });

  if (!habit) return { error: 'Habit not found' };

  const formattedLogs = (logs || []).map((l: any) => ({
    logDate: l.log_date,
    status: l.status as 'completed' | 'skipped' | 'failed',
  }));

  const today = new Date().toISOString().split('T')[0];
  const streak = calculateStreak(formattedLogs, today);
  const completionRate = calculateCompletionRate(formattedLogs);

  const prompt = buildCoachingPrompt(
    { name: habit.name, description: habit.description, frequency: habit.frequency },
    formattedLogs,
    streak,
    completionRate
  );

  try {
    const text = await callGemma4(prompt);

    await supabase.from('ai_coaching').insert({
      user_id: user.id,
      message: text,
    });

    return { message: text };
  } catch (err: any) {
    return { error: err.message };
  }
}
