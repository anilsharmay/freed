import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Post, Reply } from '../types';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { ReportButton } from '../components/ReportButton';
import { ReplyList } from '../components/ReplyList';
import { ReplyForm } from '../components/ReplyForm';

export default function Thread() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      // Fetch post
      const { data: postData, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .eq('hidden', false)
        .single();

      if (postError) {
        if (postError.code === 'PGRST116') {
          setError('Post not found or has been removed.');
          return;
        }
        throw postError;
      }
      setPost(postData);

      // Fetch replies
      const { data: repliesData, error: repliesError } = await supabase
        .from('replies')
        .select('*')
        .eq('post_id', id)
        .eq('hidden', false)
        .order('created_at', { ascending: true });

      if (repliesError) throw repliesError;
      setReplies(repliesData || []);
    } catch (err) {
      console.error('Error fetching thread:', err);
      setError('No connection. Check your network and try again.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <ErrorMessage message={error} onRetry={fetchData} />
      <Link to="/" className="btn-secondary" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px' }}>Back to Feed</Link>
    </div>
  );
  if (!post) return null;

  return (
    <div>
      <Link to="/" className="btn-secondary btn-small" style={{ marginBottom: '1.5rem', display: 'inline-block', textDecoration: 'none' }}>
        ← Back to Feed
      </Link>

      <div className="card thread-post">
        <div className="meta">
          {post.tag && <span className={`tag tag-${post.tag}`}>{post.tag}</span>}
          <span> • {new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        <p style={{ fontSize: '1.25rem', lineHeight: '1.6', margin: '1rem 0', whiteSpace: 'pre-wrap' }}>
          {post.body}
        </p>
        <ReportButton targetType="post" targetId={post.id} />
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
          Replies
        </h2>
        <ReplyList replies={replies} />
        <ReplyForm postId={post.id} onReplyAdded={fetchData} />
      </div>
    </div>
  );
}
