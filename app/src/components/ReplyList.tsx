import { Reply } from '../types';
import { ReportButton } from './ReportButton';

interface Props {
  replies: Reply[];
}

export function ReplyList({ replies }: Props) {
  if (replies.length === 0) {
    return (
      <p style={{ color: '#64748b', fontStyle: 'italic', marginTop: '1.5rem' }}>
        No replies yet. Check back soon — or add the first supportive reply.
      </p>
    );
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      {replies.map((reply) => (
        <div key={reply.id} className="reply-item">
          <div className="meta">
            {new Date(reply.created_at).toLocaleDateString()} • {new Date(reply.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <p style={{ margin: '0.5rem 0' }}>{reply.body}</p>
          <ReportButton targetType="reply" targetId={reply.id} />
        </div>
      ))}
    </div>
  );
}
