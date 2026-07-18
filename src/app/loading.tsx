export default function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="skeleton" style={{ width: '100px', height: '100px', borderRadius: '50%' }}></div>
    </div>
  );
}
