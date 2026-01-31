import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Tag } from '../types';

export default function PostNew() {
  const [body, setBody] = useState('');
  const [tag, setTag] = useState<Tag>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedBody = body.trim();

    if (trimmedBody.length < 10) {
      setError('Post must be at least 10 characters.');
      return;
    }
    if (trimmedBody.length > 500) {
      setError('Post must be less than 500 characters.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { data, error: insertError } = await supabase
        .from('posts')
        .insert({
          body: trimmedBody,
          tag: tag === 'general' ? null : tag
        })
        .select('id')
        .single();

      if (insertError) throw insertError;
      if (data) {
        navigate(`/post/success?id=${data.id}`);
      }
    } catch (err) {
      console.error('Failed to create post:', err);
      setError('Something went wrong. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '1.5rem' }}>Share Anonymously</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
        Speak your truth. No one will know it's you. Please read our{' '}
        <Link to="/guidelines" style={{ color: '#3b82f6', textDecoration: 'underline' }}>Guidelines</Link> first.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="tag" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Category (Optional)</label>
          <select id="tag" value={tag} onChange={(e) => setTag(e.target.value as Tag)}>
            <option value="general">General</option>
            <option value="relationships">Relationships</option>
            <option value="work">Work</option>
          </select>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="body" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>What's on your mind? (10-500 chars)</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="I've been struggling with..."
            rows={8}
            required
            disabled={isSubmitting}
          />
          <div style={{ textAlign: 'right', fontSize: '0.875rem', color: body.length > 500 ? '#f87171' : '#64748b' }}>
            {body.length}/500
          </div>
        </div>

        {error && <div className="error-message" style={{ marginBottom: '1.5rem' }}>{error}</div>}

        <button type="submit" disabled={isSubmitting} style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', fontWeight: 'bold' }}>
          {isSubmitting ? 'Posting...' : 'Share Privately'}
        </button>
      </form>
    </div>
  );
}
