export type Tag = 'relationships' | 'work' | 'general';

export interface Post {
  id: string;
  body: string;
  tag?: Tag;
  created_at: string;
  hidden: boolean;
}

export interface Reply {
  id: string;
  post_id: string;
  body: string;
  created_at: string;
  hidden: boolean;
}

export interface Report {
  id: string;
  target_type: 'post' | 'reply';
  target_id: string;
  reason: string;
  created_at: string;
}
