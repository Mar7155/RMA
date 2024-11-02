
import React, { useState } from 'react';

interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface Comment extends Reply {
  replies: Reply[];
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: 'RubenSOS69',
    avatar: '/placeholder.svg?height=40&width=40',
    content: 'Este artículo es muy interesante. 100% Recomendado, me ayudo a pasar mis examenes',
    date: '2023-06-15',
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: 2,
        author: 'Ivan-Kun-uwu',
        avatar: '/placeholder.svg?height=40&width=40',
        content: 'Es enserio?, hablame más sobre el artículo, estoy pensando en comprarlo',
        date: '2023-06-15',
        likes: 2,
        isLiked: false,
      }
    ]
  },
  {
    id: 3,
    author: 'Abdul-nd',
    avatar: '/placeholder.svg?height=40&width=40',
    content: 'Me gustaria que subieran más contenido seguido',
    date: '2023-06-16',
    likes: 3,
    isLiked: false,
    replies: []
  }
];

export default function CommentSystem() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [newReply, setNewReply] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: 'Usuario Actual',
        avatar: '/placeholder.svg?height=40&width=40',
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        isLiked: false,
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (!isReply && comment.id === commentId) {
          return { ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1, isLiked: !comment.isLiked };
        } else if (isReply && parentId && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === commentId
                ? { ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1, isLiked: !reply.isLiked }
                : reply
            )
          };
        }
        return comment;
      })
    );
  };

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
    setNewReply('');
  };

  const submitReply = (commentId: number) => {
    if (newReply.trim()) {
      const reply: Reply = {
        id: Date.now(),
        author: 'Usuario Actual',
        avatar: '/placeholder.svg?height=40&width=40',
        content: newReply,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        isLiked: false,
      };
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        )
      );
      setNewReply('');
      setReplyingTo(null);
    }
  };

  const renderComment = (comment: Comment | Reply, isReply: boolean = false, parentId?: number) => (
    <div key={comment.id} className={`comment ${isReply ? 'reply' : ''}`}>
      <img src={comment.avatar} alt={comment.author} className="avatar" />
      <div className="comment-content">
        <h3>{comment.author}</h3>
        <p>{comment.content}</p>
        <div className="comment-meta">
          <span className="date">{comment.date}</span>
          <button 
            className={`like-button ${comment.isLiked ? 'liked' : ''}`}
            onClick={() => handleLike(comment.id, isReply, parentId)}
          >
            👍 {comment.likes}
          </button>
          {!isReply && <button className="reply-button" onClick={() => handleReply(comment.id)}>Responder</button>}
        </div>
        {!isReply && 'replies' in comment && (
          <>
            {replyingTo === comment.id && (
              <div className="reply-form">
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                />
                <button onClick={() => submitReply(comment.id)}>Enviar Respuesta</button>
              </div>
            )}
            {comment.replies.length > 0 && (
              <div className="replies">
                {comment.replies.map(reply => renderComment(reply, true, comment.id))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="comment-system">
      <h2>Foro</h2>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe tu comentario..."
        />
        <button type="submit">Publicar Comentario</button>
      </form>
      <div className="comments-list">
        {comments.map(comment => renderComment(comment))}
      </div>
        
    </div>
  );
}