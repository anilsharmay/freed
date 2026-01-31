import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Props {
  postId: string;
  onReplyAdded: () => void;
}

export function ReplyForm({ postId, onReplyAdded }: Props) {
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedBody = body.trim();
    
    if (trimmedBody.length < 10) {
      setError('Reply must be at least 10 characters.');
      return;
    }
    if (trimmedBody.length > 1000) {
      setError('Reply must be less than 1000 characters.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('replies')
        .insert({
          post_id: postId,
          body: trimmedBody
        });

      if (insertError) throw insertError;
      
      setBody('');
      setSuccess(true);
      onReplyAdded();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to post reply:', err);
      setError('Something went wrong. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Add a supportive reply</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your encouraging words here..."
          rows={4}
          disabled={isSubmitting}
        />
        {error && <div className="error-message" style={{ marginBottom: '1rem' }}>{error}</div>}
        {success && <div className="success-message">Thanks for supporting someone.</div>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Reply'}
        </button>
      </form>
    </div>
  );
}
