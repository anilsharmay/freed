import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div>
      <Link to="/" className="btn-secondary btn-small" style={{ marginBottom: '1.5rem', display: 'inline-block', textDecoration: 'none' }}>
        ← Back
      </Link>
      
      <h1>Privacy Policy</h1>
      
      <section className="card">
        <h3>What we store</h3>
        <p style={{ color: '#cbd5e1' }}>
          We store the content of your posts and replies, along with the time they were created. We do NOT store your name, email, IP address, or any other identifying information.
        </p>
      </section>

      <section className="card">
        <h3>No tracking</h3>
        <p style={{ color: '#cbd5e1' }}>
          We don't use cookies for tracking, and we don't sell your data to anyone. This app is built for support, not for profit.
        </p>
      </section>

      <section className="card">
        <h3>Moderation</h3>
        <p style={{ color: '#cbd5e1' }}>
          Our moderators review reported content. If a post or reply violates our <Link to="/guidelines" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Guidelines</Link>, it will be hidden from the public feed and threads.
        </p>
      </section>

      <section className="card">
        <h3>Your Data, Your Control</h3>
        <p style={{ color: '#cbd5e1' }}>
          Since we don't have accounts, we cannot "delete" a specific user's data upon request because we have no way to verify who posted what. Please be mindful of what you share.
        </p>
      </section>

      <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.875rem', marginTop: '2rem' }}>
        Last updated: January 2026
      </p>
    </div>
  );
}
