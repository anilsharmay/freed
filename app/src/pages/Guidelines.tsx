import { Link } from 'react-router-dom';

export default function Guidelines() {
  return (
    <div>
      <Link to="/" className="btn-secondary btn-small" style={{ marginBottom: '1.5rem', display: 'inline-block', textDecoration: 'none' }}>
        ← Back
      </Link>
      
      <h1>Community Guidelines</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
        Freed is a safe space for anonymous peer support. To keep it that way, we ask everyone to follow these simple rules.
      </p>

      <section className="card">
        <h3>✅ What's OK</h3>
        <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8', color: '#cbd5e1' }}>
          <li>Sharing your personal struggles and feelings.</li>
          <li>Offering supportive, non-judgmental advice.</li>
          <li>Being respectful and empathetic to others.</li>
          <li>Encouraging others to seek professional help when needed.</li>
        </ul>
      </section>

      <section className="card">
        <h3>❌ What's NOT OK</h3>
        <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8', color: '#cbd5e1' }}>
          <li>Harassment, bullying, or hate speech of any kind.</li>
          <li>Solicitation, spam, or advertising.</li>
          <li>Doxxing (sharing someone else's private info).</li>
          <li>Promoting self-harm or violence.</li>
        </ul>
      </section>

      <section className="card">
        <h3>Reporting & Moderation</h3>
        <p style={{ color: '#cbd5e1' }}>
          If you see a post or reply that breaks these rules, please use the <strong>Report</strong> button. Our moderators review reports and will hide content that violates our guidelines.
        </p>
      </section>

      <div className="crisis-banner">
        <h3>In Crisis?</h3>
        <p>
          If you're in immediate danger or need someone to talk to right now, please reach out to the 988 Suicide & Crisis Lifeline.
        </p>
        <p style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '1.5rem' }}>
          Call or Text: <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer">988</a>
        </p>
      </div>
    </div>
  );
}
