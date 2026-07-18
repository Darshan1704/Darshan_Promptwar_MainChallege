'use server';

import { createClient } from '@/lib/supabase/server';
import { loginSchema, registerSchema } from '@/core/schemas/auth.schema';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Invalid input. Please check your credentials.' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function registerAction(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return { error: 'Invalid input. Please check your details.' };
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function logoutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
