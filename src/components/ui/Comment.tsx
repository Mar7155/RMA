import React, { useState } from 'react';
import Rep from './Reply';
import type { CommentType, Reply } from '../CommentSystem'; // Importar tipos necesarios

interface CommentProps {
  comment: CommentType;
  handleLike: (commentId: number, isReply?: boolean, parentId?: number) => void;
  addReply: (commentId: number, replyContent: string) => void; // Agregar esta línea
}

export default function Comment({ comment, handleLike, addReply }: CommentProps) {
  const [replyContent, setReplyContent] = useState(""); // Estado para el contenido de la respuesta

  const handleAddReply = () => {
    if (replyContent.trim()) {
      addReply(comment.id, replyContent); // Llamar a la función de respuesta con el id del comentario
      setReplyContent(""); // Limpiar el campo de respuesta
    }
  };

  return (
    <div className="comment">
      <img src={comment.avatar} alt={comment.author} className="avatar" />
      <div className="comment-content">
        <h3>{comment.author}</h3>
        <p>{comment.content}</p>
        <div className="comment-meta">
          <span className="date">{comment.date}</span>
          <button
            className={`like-button ${comment.isLiked ? 'liked' : ''}`}
            onClick={() => handleLike(comment.id)}
          >
            👍 {comment.likes}
          </button>
        </div>
        <div className="replies">
          {comment.replies.map(reply => (
            <Rep
              key={reply.id}
              reply={reply}
              handleLike={handleLike}
              parentId={comment.id} // Pasar el id del comentario padre
            />
          ))}
        </div>

        <div className="reply-form">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Escribe una respuesta..."
          />
          <button onClick={handleAddReply}>Responder</button>
        </div>
      </div>
    </div>
  );
}
