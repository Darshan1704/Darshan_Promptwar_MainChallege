'use client';

import { useState } from 'react';
import { registerAction } from '@/app/actions/auth';
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
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'fixed', width: '500px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.12) 0%, transparent 70%)',
        borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: '440px', position: 'relative',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px', padding: '2.5rem',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚀</div>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.6rem',
            background: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: '0.4rem',
          }}>
            Create an Account
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'rgba(240,240,255,0.45)' }}>
            Start your journey to breaking bad habits
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            marginBottom: '1.25rem', padding: '0.75rem 1rem',
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '10px', color: '#fca5a5', fontSize: '0.85rem',
          }} role="alert">
            ⚠ {error}
          </div>
        )}

        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label" htmlFor="register-name">Full Name</label>
            <input
              id="register-name"
              className="form-input"
              type="text"
              name="fullName"
              placeholder="e.g. John Doe"
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="register-email">Email Address</label>
            <input
              id="register-email"
              className="form-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="register-password">Password</label>
            <input
              id="register-password"
              className="form-input"
              type="password"
              name="password"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ marginTop: '0.5rem', width: '100%', padding: '0.8rem' }}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'rgba(240,240,255,0.4)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#06b6d4', textDecoration: 'none', fontWeight: 600 }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
