import { z } from 'zod';

export const habitSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']),
});

export type HabitInput = z.infer<typeof habitSchema>;

export const habitLogSchema = z.object({
  habitId: z.string().uuid('Invalid habit ID'),
  status: z.enum(['completed', 'skipped', 'failed']),
  notes: z.string().optional(),
  logDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be YYYY-MM-DD'),
});

export type HabitLogInput = z.infer<typeof habitLogSchema>;
