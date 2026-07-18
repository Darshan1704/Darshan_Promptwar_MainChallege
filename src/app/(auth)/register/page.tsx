'use client';

import { useState } from 'react';
import { registerAction } from '@/app/actions/auth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await registerAction(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)]">
      <div className="w-full max-w-md p-8 bg-[var(--card-bg)] rounded-lg shadow-md border border-[var(--border)]">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm" role="alert">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="flex flex-col gap-4">
          <Input 
            label="Full Name" 
            type="text" 
            name="fullName" 
            required 
          />
          <Input 
            label="Email Address" 
            type="email" 
            name="email" 
            required 
          />
          <Input 
            label="Password" 
            type="password" 
            name="password" 
            minLength={6}
            required 
          />
          <Button type="submit" isLoading={isLoading} className="mt-2">
            Sign Up
          </Button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--primary)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
