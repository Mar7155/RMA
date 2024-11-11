import React, { useState } from 'react';

interface ReplyFormProps {
  onSubmit: (content: string) => void;
}

export default function ReplyForm({ onSubmit }: ReplyFormProps) {
  const [newReply, setNewReply] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReply.trim()) {
      onSubmit(newReply);
      setNewReply('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <textarea
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        placeholder="Escribe tu respuesta..."
      />
      <button type="submit">Enviar Respuesta</button>
    </form>
  );
}
