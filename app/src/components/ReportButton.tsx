import { useState } from 'react';
import { Flag } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  targetType: 'post' | 'reply';
  targetId: string;
}

export function ReportButton({ targetType, targetId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('spam');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('reports')
        .insert({
          target_type: targetType,
          target_id: targetId,
          reason
        });

      if (error) throw error;
      setIsSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Report failed:', err);
      alert('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="report-btn">
        <Flag size={12} /> Report
      </button>
    );
  }

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {isSuccess ? (
          <p className="success-message">Thanks, we'll review.</p>
        ) : (
          <>
            <h3 style={{ marginTop: 0 }}>Report content</h3>
            <form onSubmit={handleSubmit}>
              <label htmlFor="reason" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                Reason for reporting:
              </label>
              <select 
                id="reason" 
                value={reason} 
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="spam">Spam</option>
                <option value="harassment">Harassment</option>
                <option value="hate_speech">Hate Speech</option>
                <option value="other">Other</option>
              </select>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)} 
                  className="btn-secondary btn-small"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-small" 
                  style={{ backgroundColor: '#f43f5e' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
