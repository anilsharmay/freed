import { useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';

export default function PostSuccess() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [copied, setCopied] = useState(false);

  const threadUrl = `${window.location.origin}/thread/${id}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(threadUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
      <div style={{ backgroundColor: 'rgba(52, 211, 153, 0.1)', color: '#34d399', padding: '1rem', borderRadius: '50%', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <Check size={32} />
      </div>
      
      <h1>Your post is live</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Save this link to check back for supportive replies. We don't use accounts, so this link is your only way back.
      </p>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem', textAlign: 'left' }}>Your private thread link:</p>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', backgroundColor: '#0f172a', padding: '0.75rem', borderRadius: '8px', border: '1px solid #334155' }}>
          <code style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, textAlign: 'left', fontSize: '0.875rem' }}>
            {threadUrl}
          </code>
          <button onClick={copyToClipboard} className="btn-secondary btn-small" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Link to={`/thread/${id}`} className="btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', borderRadius: '8px', fontWeight: 'bold' }}>
          Open Thread <ExternalLink size={18} />
        </Link>
        <Link to="/" className="btn-secondary" style={{ textDecoration: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 'bold' }}>
          Back to Feed
        </Link>
      </div>

      <div className="crisis-banner">
        <p style={{ margin: 0 }}>
          If you're in crisis, reach out: <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer">988</a> (Crisis Line)
        </p>
      </div>
    </div>
  );
}
