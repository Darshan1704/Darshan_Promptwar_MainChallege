'use server';

import { createClient } from '@/lib/supabase/server';
import { buildCoachingPrompt } from '@/core/aiPromptBuilder';
import { calculateStreak, calculateCompletionRate } from '@/core/habitScoring';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Uses GEMINI_API_KEY from .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (!text) return { error: 'AI returned an empty response. Please try again.' };

    await supabase.from('ai_coaching').insert({
      user_id: user.id,
      message: text,
    });

    return { message: text };
  } catch (err: any) {
    return { error: err.message };
  }
}
