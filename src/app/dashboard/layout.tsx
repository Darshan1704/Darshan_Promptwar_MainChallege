import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { logoutAction } from '@/app/actions/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* HEADER */}
      <header className="app-header">
        <div className="container" style={{
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🔥</span>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.15rem',
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              BreakFree
            </span>
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 0.9rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '100px',
            }}>
              <span style={{ fontSize: '0.9rem' }}>👤</span>
              <span style={{ fontSize: '0.85rem', color: 'rgba(240,240,255,0.7)', fontWeight: 500 }}>
                {displayName}
              </span>
            </div>
            <form action={logoutAction}>
              <button type="submit" className="btn btn-ghost btn-sm" style={{ fontSize: '0.8rem' }}>
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        {children}
      </main>
    </div>
  );
}
