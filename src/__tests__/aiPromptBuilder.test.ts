import { describe, it, expect } from 'vitest';
import { buildCoachingPrompt } from '../core/aiPromptBuilder';
import { HabitLog } from '../core/habitScoring';

describe('aiPromptBuilder', () => {
  it('builds a valid prompt containing all relevant info', () => {
    const habit = { name: 'Read a book', frequency: 'daily' };
    const logs: HabitLog[] = [
      { logDate: '2023-10-10', status: 'completed' },
    ];
    
    const prompt = buildCoachingPrompt(habit, logs, 1, 100);
    
    expect(prompt).toContain('Read a book');
    expect(prompt).toContain('daily');
    expect(prompt).toContain('Current Streak: 1 days');
    expect(prompt).toContain('Completion Rate: 100%');
    expect(prompt).toContain('2023-10-10: completed');
  });
});
