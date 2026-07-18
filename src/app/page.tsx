import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(7,8,15,0.8)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.6rem' }}>🔥</span>
          <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem',
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            BreakFree
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/login" className="btn btn-ghost btn-sm">Sign In</Link>
          <Link href="/register" className="btn btn-primary btn-sm">Get Started Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '8rem 1.5rem 4rem', position: 'relative' }}>

        {/* Glow orb */}
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)',
          borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: '800px' }}>
          <div className="badge badge-purple" style={{ marginBottom: '1.5rem', fontSize: '0.8rem' }}>
            ✦ Powered by Gemma AI
          </div>

          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1,
            marginBottom: '1.5rem', letterSpacing: '-0.03em',
          }}>
            Break Free From{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Bad Habits
            </span>{' '}
            & Addiction
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(240,240,255,0.6)',
            maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7,
          }}>
            AI-powered personalized coaching helps you overcome cigarettes, screen addiction, alcohol, and other harmful habits — one day at a time.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn btn-primary btn-lg">
              🚀 Start Breaking Free
            </Link>
            <Link href="/login" className="btn btn-outline btn-lg">
              Sign In
            </Link>
          </div>
        </div>

        {/* FEATURE PILLS */}
        <div style={{
          display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
          marginTop: '4rem', position: 'relative',
        }}>
          {[
            { icon: '🤖', label: 'Gemma AI Coaching' },
            { icon: '📊', label: 'Progress Tracking' },
            { icon: '🔥', label: 'Streak System' },
            { icon: '🎯', label: 'Personalized Nudges' },
            { icon: '💪', label: 'Behavior Science' },
          ].map(f => (
            <div key={f.label} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.2rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '100px', fontSize: '0.85rem', color: 'rgba(240,240,255,0.7)',
            }}>
              <span>{f.icon}</span> {f.label}
            </div>
          ))}
        </div>

        {/* STATS ROW */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem', maxWidth: '600px', width: '100%',
          marginTop: '5rem', position: 'relative',
        }}>
          {[
            { value: '10K+', label: 'Habits Tracked' },
            { value: '87%', label: 'Success Rate' },
            { value: '30 Days', label: 'Avg. Streak Record' },
          ].map(s => (
            <div key={s.label} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.8rem',
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(240,240,255,0.5)', marginTop: '0.25rem' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{
        textAlign: 'center', padding: '1.5rem',
        color: 'rgba(240,240,255,0.3)', fontSize: '0.8rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        Built for PromptWars 2026 · Breaking Bad Habits & Addiction Challenge
      </footer>
    </div>
  );
}
