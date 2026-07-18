/**
 * Represents a log entry for a habit
 */
export interface HabitLog {
  logDate: string; // YYYY-MM-DD
  status: 'completed' | 'skipped' | 'failed';
}

/**
 * Calculates the current streak of completed habits.
 * 
 * @param logs - Array of habit logs, must be sorted by date descending (newest first).
 * @param currentDate - The current date in YYYY-MM-DD format to check against.
 * @returns The current streak count.
 */
export function calculateStreak(logs: HabitLog[], currentDate: string): number {
  if (!logs || logs.length === 0) return 0;

  let streak = 0;
  let expectedDate = new Date(currentDate);

  for (const log of logs) {
    if (log.status === 'skipped') {
      // Skipped days don't break the streak but don't add to it
      expectedDate.setDate(expectedDate.getDate() - 1);
      continue;
    }

    if (log.status === 'failed') {
      break;
    }

    if (log.status === 'completed') {
      const logDateObj = new Date(log.logDate);
      // We only count if it matches the expected date (continuous)
      // For simplicity, we just check if it's the exact expected date
      const expectedDateString = expectedDate.toISOString().split('T')[0];
      
      if (log.logDate === expectedDateString || log.logDate === currentDate) {
        streak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        // Gap in days breaks the streak
        break;
      }
    }
  }

  return streak;
}

/**
 * Calculates the completion rate percentage.
 * 
 * @param logs - Array of habit logs
 * @returns The completion rate as a percentage (0-100)
 */
export function calculateCompletionRate(logs: HabitLog[]): number {
  if (!logs || logs.length === 0) return 0;
  const completed = logs.filter(log => log.status === 'completed').length;
  return Math.round((completed / logs.length) * 100);
}
