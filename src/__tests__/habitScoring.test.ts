import { describe, it, expect } from 'vitest';
import { calculateStreak, calculateCompletionRate, HabitLog } from '../core/habitScoring';

describe('habitScoring', () => {
  describe('calculateStreak', () => {
    it('returns 0 for empty logs', () => {
      expect(calculateStreak([], '2023-10-10')).toBe(0);
    });

    it('calculates a simple continuous streak', () => {
      const logs: HabitLog[] = [
        { logDate: '2023-10-10', status: 'completed' },
        { logDate: '2023-10-09', status: 'completed' },
        { logDate: '2023-10-08', status: 'completed' },
      ];
      expect(calculateStreak(logs, '2023-10-10')).toBe(3);
    });

    it('ignores skipped days for streak calculation', () => {
      const logs: HabitLog[] = [
        { logDate: '2023-10-10', status: 'completed' },
        { logDate: '2023-10-09', status: 'skipped' },
        { logDate: '2023-10-08', status: 'completed' },
      ];
      expect(calculateStreak(logs, '2023-10-10')).toBe(2);
    });

    it('breaks the streak on a failed day', () => {
      const logs: HabitLog[] = [
        { logDate: '2023-10-10', status: 'completed' },
        { logDate: '2023-10-09', status: 'failed' },
        { logDate: '2023-10-08', status: 'completed' },
      ];
      expect(calculateStreak(logs, '2023-10-10')).toBe(1);
    });
  });

  describe('calculateCompletionRate', () => {
    it('returns 0 for empty logs', () => {
      expect(calculateCompletionRate([])).toBe(0);
    });

    it('calculates the correct percentage', () => {
      const logs: HabitLog[] = [
        { logDate: '2023-10-10', status: 'completed' },
        { logDate: '2023-10-09', status: 'failed' },
        { logDate: '2023-10-08', status: 'skipped' },
        { logDate: '2023-10-07', status: 'completed' },
      ];
      expect(calculateCompletionRate(logs)).toBe(50);
    });
  });
});
