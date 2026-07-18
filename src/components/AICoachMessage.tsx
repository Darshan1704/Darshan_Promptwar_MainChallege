'use client';

import { useState } from 'react';
import { generateAICoachingAction } from '@/app/actions/ai';

export function AICoachMessage({ habitId }: { habitId: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGetCoaching() {
    setIsLoading(true);
    setError(null);
    const res = await generateAICoachingAction(habitId);
    if (res.error) {
      setError(res.error);
    } else if (res.message) {
      setMessage(res.message);
    }
    setIsLoading(false);
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(124,58,237,0.07), rgba(6,182,212,0.05))',
      border: '1px solid rgba(124,58,237,0.2)',
      borderRadius: '12px',
      padding: '1rem',
    }}>
      {/* Loading state */}
      {isLoading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.85rem', flexShrink: 0,
          }}>
            🤖
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '0.78rem', color: 'rgba(240,240,255,0.5)',
              marginBottom: '0.4rem',
            }}>
              Gemma AI is crafting your personalized nudge...
            </div>
            <div style={{
              height: '6px', borderRadius: '100px',
              background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: '60%', borderRadius: '100px',
                background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                animation: 'shimmer 1.5s infinite',
                backgroundSize: '200% 100%',
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#fca5a5' }}>⚠ {error}</p>
          <button onClick={handleGetCoaching} style={{
            background: 'transparent', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px', color: '#fca5a5', fontSize: '0.78rem',
            padding: '0.35rem 0.75rem', cursor: 'pointer', alignSelf: 'flex-start',
          }}>
            Try again
          </button>
        </div>
      )}

      {/* Message state */}
      {message && !isLoading && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', flexShrink: 0,
            }}>
              🤖
            </div>
            <span style={{
              fontSize: '0.72rem', fontWeight: 700, color: '#a78bfa',
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              Gemma AI Coach
            </span>
          </div>
          <p style={{
            fontSize: '0.87rem', color: 'rgba(240,240,255,0.8)',
            lineHeight: 1.65, fontStyle: 'italic',
          }}>
            "{message}"
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button
              onClick={handleGetCoaching}
              style={{
                background: 'transparent', border: '1px solid rgba(124,58,237,0.3)',
                borderRadius: '8px', color: '#a78bfa', fontSize: '0.75rem',
                padding: '0.3rem 0.7rem', cursor: 'pointer',
              }}
            >
              ↺ New nudge
            </button>
            <button
              onClick={() => { setMessage(null); setError(null); }}
              style={{
                background: 'transparent', border: 'none',
                color: 'rgba(240,240,255,0.3)', fontSize: '0.75rem',
                padding: '0.3rem 0.5rem', cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Default CTA */}
      {!message && !isLoading && !error && (
        <button
          onClick={handleGetCoaching}
          style={{
            width: '100%', padding: '0.65rem 1rem',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '10px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            color: '#a78bfa', fontSize: '0.85rem', fontWeight: 600,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.6)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)')}
        >
          🤖 Get AI Coaching Nudge
        </button>
      )}
    </div>
  );
}
