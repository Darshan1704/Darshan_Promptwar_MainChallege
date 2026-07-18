'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#fca5a5' }}>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="btn btn-outline"
      >
        Try again
      </button>
    </div>
  );
}
