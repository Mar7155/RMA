import React, { useState } from 'react';

interface CommentFormProps {
  onSubmit: (content: string) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onSubmit(newComment);
      setNewComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Escribe tu comentario..."
      />
      <button type="submit">Publicar Comentario</button>
    </form>
  );
}
