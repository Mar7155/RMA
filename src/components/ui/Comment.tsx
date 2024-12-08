import React, { useState } from "react";
import Rep from "./Reply";
import type { CommentType } from "../CommentSystem";

interface CommentProps {
  comment: CommentType;
  handleLike: (commentId: number, isReply?: boolean, parentId?: number) => void;
  addReply: (commentId: number, replyContent: string) => Promise<void>;
}

export default function Comment({ comment, handleLike, addReply }: CommentProps) {
  const [replyContent, setReplyContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddReply = async () => {
    if (replyContent.trim()) {
      try {
        await addReply(comment.id, replyContent);
        setReplyContent("");
        setError(null);
      } catch (err) {
        setError("Error al enviar la respuesta. Intenta de nuevo.");
      }
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
            className={`like-button ${comment.isLiked ? "liked" : ""}`}
            onClick={() => handleLike(comment.id)}
          >
            👍 {comment.likes}
          </button>

        </div>
        <div className="replies">
          {comment.replies.map((reply) => (
            <Rep
              key={reply.id}
              reply={reply}
              handleLike={handleLike}
              parentId={comment.id}
            />
          ))}
        </div>
        <div className="reply-form">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Escribe una respuesta..."
          />
          <button onClick={handleAddReply} disabled={!replyContent.trim()}>
            Responder
          </button>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
}
