'use client';

import { useState } from 'react';
import { logHabitAction, deleteHabitAction } from '@/app/actions/habit';
import { AICoachMessage } from '@/components/AICoachMessage';

interface HabitCardProps {
  habit: {
    id: string;
    name: string;
    description: string | null;
    frequency: string;
  };
  streak: number;
  completionRate: number;
  todayStatus?: 'completed' | 'skipped' | 'failed';
}

export function HabitCard({ habit, streak, completionRate, todayStatus }: HabitCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(todayStatus);
  const [toast, setToast] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  async function handleLog(status: 'completed' | 'skipped' | 'failed') {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('habitId', habit.id);
    formData.append('status', status);
    formData.append('logDate', today);
    await logHabitAction(formData);
    setCurrentStatus(status);
    if (status === 'completed') showToast('🎉 Great job! Keep the streak going!');
    else if (status === 'skipped') showToast('⏭ Skipped — you got this tomorrow!');
    else showToast('💪 Setbacks are part of the journey. Bounce back!');
    setIsLoading(false);
  }

  async function handleDelete() {
    if (confirm('Delete this habit? This cannot be undone.')) {
      setIsLoading(true);
      await deleteHabitAction(habit.id);
    }
  }

  const streakColor = streak >= 30 ? '#f59e0b' : streak >= 7 ? '#10b981' : streak >= 1 ? '#06b6d4' : 'rgba(240,240,255,0.3)';
  const isAddiction = /smoke|cigarette|alcohol|drink|drug|gaming|social media|screen|phone|vape/i.test(
    (habit.name + ' ' + (habit.description || '')).toLowerCase()
  );

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${currentStatus === 'completed' ? 'rgba(16,185,129,0.3)' : currentStatus === 'failed' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: '16px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      position: 'relative',
      transition: 'border-color 0.3s ease',
    }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'absolute', top: '-3.5rem', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px',
          padding: '0.5rem 1rem', fontSize: '0.82rem', whiteSpace: 'nowrap',
          color: '#f0f0ff', zIndex: 10, animation: 'fadeInUp 0.3s ease',
        }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <h3 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 700,
              fontSize: '1.05rem', color: '#f0f0ff',
            }}>
              {habit.name}
            </h3>
            {isAddiction && (
              <span style={{
                fontSize: '0.65rem', padding: '0.15rem 0.5rem',
                background: 'rgba(239,68,68,0.12)', color: '#fca5a5',
                border: '1px solid rgba(239,68,68,0.25)', borderRadius: '100px',
                fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                Addiction
              </span>
            )}
          </div>
          {habit.description && (
            <p style={{ fontSize: '0.82rem', color: 'rgba(240,240,255,0.45)', lineHeight: 1.5 }}>
              {habit.description}
            </p>
          )}
        </div>

        {/* Streak badge */}
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.5rem',
            color: streakColor, lineHeight: 1,
          }}>
            {streak}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(240,240,255,0.4)', marginTop: '0.1rem' }}>
            🔥 days
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{
          fontSize: '0.72rem', padding: '0.2rem 0.6rem',
          background: 'rgba(124,58,237,0.12)', color: '#a78bfa',
          border: '1px solid rgba(124,58,237,0.25)', borderRadius: '100px',
          fontWeight: 600, textTransform: 'capitalize',
        }}>
          {habit.frequency}
        </span>
        <span style={{ fontSize: '0.78rem', color: 'rgba(240,240,255,0.4)' }}>
          {completionRate}% completion rate
        </span>
      </div>

      {/* Progress bar */}
      <div>
        <div style={{
          width: '100%', height: '5px',
          background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden',
        }}>
          <div style={{
            width: `${completionRate}%`, height: '100%',
            background: `linear-gradient(90deg, #7c3aed, #06b6d4)`,
            borderRadius: '100px',
            transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
          }} />
        </div>
      </div>

      {/* Today's log buttons */}
      <div>
        <p style={{
          fontSize: '0.75rem', color: 'rgba(240,240,255,0.4)',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          fontWeight: 600, marginBottom: '0.6rem',
        }}>
          Today&apos;s Check-in
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => handleLog('completed')}
            disabled={isLoading || currentStatus === 'completed'}
            style={{
              flex: 1, padding: '0.55rem 0.5rem', borderRadius: '8px',
              cursor: isLoading || currentStatus === 'completed' ? 'default' : 'pointer',
              background: currentStatus === 'completed'
                ? 'rgba(16,185,129,0.2)' : 'rgba(16,185,129,0.08)',
              color: '#6ee7b7',
              border: `1px solid ${currentStatus === 'completed' ? 'rgba(16,185,129,0.5)' : 'rgba(16,185,129,0.2)'}`,
              fontSize: '0.82rem', fontWeight: 600,
              opacity: isLoading ? 0.5 : 1, transition: 'all 0.2s',
            } as any}
          >
            ✓ Done
          </button>
          <button
            onClick={() => handleLog('skipped')}
            disabled={isLoading || currentStatus === 'skipped'}
            style={{
              flex: 1, padding: '0.55rem 0.5rem', borderRadius: '8px',
              cursor: isLoading || currentStatus === 'skipped' ? 'default' : 'pointer',
              background: currentStatus === 'skipped'
                ? 'rgba(245,158,11,0.2)' : 'rgba(245,158,11,0.06)',
              color: '#fcd34d',
              border: `1px solid ${currentStatus === 'skipped' ? 'rgba(245,158,11,0.4)' : 'rgba(245,158,11,0.15)'}`,
              fontSize: '0.82rem', fontWeight: 600,
              opacity: isLoading ? 0.5 : 1, transition: 'all 0.2s',
            } as any}
          >
            ⏭ Skip
          </button>
          <button
            onClick={() => handleLog('failed')}
            disabled={isLoading || currentStatus === 'failed'}
            style={{
              flex: 1, padding: '0.55rem 0.5rem', borderRadius: '8px',
              cursor: isLoading || currentStatus === 'failed' ? 'default' : 'pointer',
              background: currentStatus === 'failed'
                ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.06)',
              color: '#fca5a5',
              border: `1px solid ${currentStatus === 'failed' ? 'rgba(239,68,68,0.4)' : 'rgba(239,68,68,0.15)'}`,
              fontSize: '0.82rem', fontWeight: 600,
              opacity: isLoading ? 0.5 : 1, transition: 'all 0.2s',
            } as any}
          >
            ✗ Failed
          </button>
        </div>
      </div>

      {/* AI Coach */}
      <AICoachMessage habitId={habit.id} />

      {/* Delete */}
      <div style={{ textAlign: 'right', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
        <button
          onClick={handleDelete}
          disabled={isLoading}
          style={{
            background: 'transparent', border: 'none',
            color: 'rgba(239,68,68,0.5)', cursor: 'pointer',
            fontSize: '0.75rem', fontWeight: 500,
          }}
        >
          🗑 Delete Habit
        </button>
      </div>
    </div>
  );
}
