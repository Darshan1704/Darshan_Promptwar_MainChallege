'use server';

import { createClient } from '@/lib/supabase/server';
import { habitSchema, habitLogSchema } from '@/core/schemas/habit.schema';
import { revalidatePath } from 'next/cache';

export async function createHabitAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  const parsed = habitSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Invalid input.' };
  }

  const supabase = createClient();
  const { data: userData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !userData?.user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('habits')
    .insert({
      user_id: userData.user.id,
      name: parsed.data.name,
      description: parsed.data.description,
      frequency: parsed.data.frequency,
    });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function logHabitAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  const parsed = habitLogSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Invalid input.' };
  }

  const supabase = createClient();
  const { data: userData, error: authError } = await supabase.auth.getUser();
  
  if (authError || !userData?.user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('habit_logs')
    .upsert({
      habit_id: parsed.data.habitId,
      user_id: userData.user.id,
      status: parsed.data.status,
      notes: parsed.data.notes,
      log_date: parsed.data.logDate,
    }, { onConflict: 'habit_id,log_date' });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function deleteHabitAction(habitId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('habits')
    .delete()
    .eq('id', habitId);
    
  if (error) {
    return { error: error.message };
  }
  
  revalidatePath('/dashboard');
  return { success: true };
}
