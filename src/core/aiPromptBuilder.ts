import { HabitLog } from './habitScoring';

export interface HabitData {
  name: string;
  description?: string;
  frequency: string;
}

export function buildCoachingPrompt(
  habit: HabitData,
  logs: HabitLog[],
  currentStreak: number,
  completionRate: number
): string {
  const recentLogsStr = logs
    .slice(0, 14)
    .map(l => `${l.logDate}: ${l.status}`)
    .join(', ');

  const recentFailures = logs.slice(0, 7).filter(l => l.status === 'failed').length;
  const isAddiction = /smoke|cigarette|alcohol|drink|drug|porn|gaming|social media|screen|phone|vape/i.test(
    (habit.name + ' ' + (habit.description || '')).toLowerCase()
  );

  let toneInstruction = '';
  if (currentStreak >= 30) {
    toneInstruction = 'The user is doing AMAZING — 30+ day streak! Be celebratory and help them think about life beyond this habit.';
  } else if (currentStreak >= 7) {
    toneInstruction = 'Great streak! Be enthusiastic, acknowledge their discipline, and motivate them to push to the next milestone.';
  } else if (currentStreak >= 1) {
    toneInstruction = 'They\'ve started! Encourage the momentum. Early days are the hardest — be warm and specific.';
  } else if (recentFailures >= 3) {
    toneInstruction = 'They\'ve been struggling with multiple failures. Be compassionate, non-judgmental, and science-backed. Offer a concrete micro-strategy to restart.';
  } else {
    toneInstruction = 'Fresh start or inconsistent. Be encouraging without being preachy. Give one actionable tip.';
  }

  const addictionNote = isAddiction
    ? 'IMPORTANT: This appears to be an addiction/harmful habit. Treat it with clinical empathy — acknowledge craving science, withdrawal difficulty, and praise any resistance.'
    : '';

  return `You are BreakFree AI — an expert, deeply empathetic behavior-change coach specializing in breaking bad habits and addictions.

${addictionNote}

USER'S HABIT: "${habit.name}"
Description: ${habit.description || 'No description provided'}
Goal Frequency: ${habit.frequency}

PROGRESS DATA:
- Current Streak: ${currentStreak} day${currentStreak !== 1 ? 's' : ''}
- Overall Completion Rate: ${completionRate}%
- Recent History (last 14 days): ${recentLogsStr || 'No logs yet'}
- Recent Failures (last 7 days): ${recentFailures}

TONE GUIDANCE: ${toneInstruction}

INSTRUCTIONS:
- Write exactly 2–3 sentences. No more.
- Be SPECIFIC to this habit — never generic.
- Use the user's actual data (streak, completion rate, recent pattern).
- End with ONE concrete, immediately actionable micro-step for today.
- Do NOT use em dashes, excessive emojis, or bullet points.
- Sound human, warm, and expert — not robotic or overly formal.`;
}
