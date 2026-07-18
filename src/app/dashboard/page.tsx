import { createClient } from '@/lib/supabase/server';
import { HabitCard } from '@/components/HabitCard';
import { calculateStreak, calculateCompletionRate } from '@/core/habitScoring';
import { createHabitAction } from '@/app/actions/habit';

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const { data: habits } = await supabase
    .from('habits')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: logs } = await supabase
    .from('habit_logs')
    .select('*')
    .order('log_date', { ascending: false });

  const today = new Date().toISOString().split('T')[0];

  // Compute global stats
  const totalHabits = habits?.length || 0;
  const allLogs = logs || [];
  const bestStreak = habits?.reduce((best, habit) => {
    const habitLogs = allLogs.filter((l: any) => l.habit_id === habit.id)
      .map((l: any) => ({ logDate: l.log_date, status: l.status }));
    return Math.max(best, calculateStreak(habitLogs, today));
  }, 0) || 0;
  const overallRate = habits?.length
    ? Math.round(habits.reduce((sum, habit) => {
        const habitLogs = allLogs.filter((l: any) => l.habit_id === habit.id)
          .map((l: any) => ({ logDate: l.log_date, status: l.status }));
        return sum + calculateCompletionRate(habitLogs);
      }, 0) / habits.length)
    : 0;
  const todayCompleted = habits?.filter(habit => {
    return allLogs.some((l: any) => l.habit_id === habit.id && l.log_date === today && l.status === 'completed');
  }).length || 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {/* PAGE HEADER */}
      <div>
        <h2 style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 800,
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', letterSpacing: '-0.02em',
          marginBottom: '0.4rem',
        }}>
          Your Recovery Dashboard
        </h2>
        <p style={{ color: 'rgba(240,240,255,0.5)', fontSize: '0.9rem' }}>
          Track your progress, get AI coaching, and stay free from bad habits.
        </p>
      </div>

      {/* STATS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1rem',
      }}>
        {[
          { icon: '📋', value: totalHabits, label: 'Habits Tracked', color: '#7c3aed' },
          { icon: '🔥', value: bestStreak, label: 'Best Streak (days)', color: '#f59e0b' },
          { icon: '✅', value: `${overallRate}%`, label: 'Avg. Completion', color: '#10b981' },
          { icon: '🎯', value: `${todayCompleted}/${totalHabits}`, label: "Done Today", color: '#06b6d4' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            padding: '1.25rem 1.5rem',
          }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2rem',
              color: stat.color, lineHeight: 1,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '0.75rem', color: 'rgba(240,240,255,0.4)',
              marginTop: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* HABITS SECTION */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.2rem' }}>
            Your Habits
          </h3>
          {totalHabits > 0 && (
            <span style={{
              fontSize: '0.75rem', color: 'rgba(240,240,255,0.4)',
              background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.7rem',
              borderRadius: '100px', border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {totalHabits} habit{totalHabits !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {(!habits || habits.length === 0) ? (
          <div style={{
            textAlign: 'center', padding: '3rem',
            background: 'rgba(255,255,255,0.02)',
            border: '1px dashed rgba(255,255,255,0.1)',
            borderRadius: '16px',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <p style={{ color: 'rgba(240,240,255,0.5)', marginBottom: '0.5rem' }}>
              No habits yet. Add your first one below!
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(240,240,255,0.3)' }}>
              Start with one habit — like quitting cigarettes or reducing screen time.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}>
            {habits.map(habit => {
              const habitLogs = allLogs.filter((l: any) => l.habit_id === habit.id);
              const streak = calculateStreak(
                habitLogs.map((l: any) => ({ logDate: l.log_date, status: l.status })),
                today
              );
              const completionRate = calculateCompletionRate(
                habitLogs.map((l: any) => ({ logDate: l.log_date, status: l.status }))
              );
              const todayLog = habitLogs.find((l: any) => l.log_date === today);
              return (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  streak={streak}
                  completionRate={completionRate}
                  todayStatus={todayLog?.status as any}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* ADD HABIT FORM */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '16px',
        padding: '2rem',
        maxWidth: '520px',
      }}>
        <h3 style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem',
          marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          ➕ Add a New Habit
        </h3>
        <form action={createHabitAction as any} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label className="form-label" htmlFor="habit-name">Habit Name</label>
            <input
              id="habit-name"
              className="form-input"
              type="text"
              name="name"
              placeholder="e.g. Quit smoking, No social media after 9PM"
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="habit-desc">Description (optional)</label>
            <input
              id="habit-desc"
              className="form-input"
              type="text"
              name="description"
              placeholder="Why do you want to break this habit?"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="habit-freq">Frequency</label>
            <select id="habit-freq" name="frequency" className="form-input">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
            🚀 Start Tracking
          </button>
        </form>
      </div>
    </div>
  );
}
