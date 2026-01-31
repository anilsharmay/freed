import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('hidden', false)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('No connection. Check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900 }}>Freed</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '400px', margin: '0 auto' }}>
          Heal from the things you don't talk about.
        </p>
        
        <div className="card" style={{ textAlign: 'left', marginTop: '2rem' }}>
          <h3 style={{ marginTop: 0 }}>How it works</h3>
          <ol style={{ paddingLeft: '1.2rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
            <li>Post what's on your mind anonymously.</li>
            <li>Receive supportive replies from the community.</li>
            <li>Return via link to read when you're ready.</li>
          </ol>
          <Link to="/post" className="btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', backgroundColor: '#3b82f6', color: 'white', padding: '0.75rem', borderRadius: '8px', fontWeight: 'bold' }}>
            Share Your Story
          </Link>
        </div>
      </header>

      <div className="feed">
        <h2 style={{ marginBottom: '1.5rem' }}>Recent Shares</h2>
        
        {loading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} onRetry={fetchPosts} />}
        
        {!loading && !error && posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              No posts yet. Be the first to share — you're anonymous.
            </p>
            <Link to="/post" className="btn" style={{ display: 'inline-block', textDecoration: 'none', backgroundColor: '#3b82f6', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 'bold' }}>
              Start the Conversation
            </Link>
          </div>
        )}

        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
