import React from 'react';
import type { Reply as ReplyType } from '../CommentSystem.tsx';

interface ReplyProps {
  reply: ReplyType;
  handleLike: (replyId: number, isReply: boolean, parentId: number) => void;
  parentId: number;
}

export default function Reply({ reply, handleLike, parentId }: ReplyProps) {
  return (
    <div className="reply">
      <img src={reply.avatar} alt={reply.author} className="avatar" />
      <div className="comment-content">
        <h3>{reply.author}</h3>
        <p>{reply.content}</p>
        <div className="comment-meta">
          <span className="date">{reply.date}</span>
          <button 
            className={`like-button ${reply.isLiked ? 'liked' : ''}`}
            onClick={() => handleLike(reply.id, true, parentId)}
          >
            👍 {reply.likes}
          </button>
        </div>
      </div>
    </div>
  );
}
