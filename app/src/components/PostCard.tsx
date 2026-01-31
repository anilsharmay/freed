import { Link } from 'react-router-dom';
import { Post } from '../types';

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  const date = new Date(post.created_at).toLocaleDateString();

  return (
    <div className="card">
      <div className="meta">
        {post.tag && <span className={`tag tag-${post.tag}`}>{post.tag}</span>}
        <span> • {date}</span>
      </div>
      <p style={{ margin: '0.5rem 0 1rem' }}>
        {post.body.length > 150 ? `${post.body.substring(0, 150)}...` : post.body}
      </p>
      <Link to={`/thread/${post.id}`} className="btn-secondary btn-small" style={{ display: 'inline-block' }}>
        View Thread
      </Link>
    </div>
  );
}
