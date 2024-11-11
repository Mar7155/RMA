import React, { useState, useEffect } from 'react';
import CommentForm from './ui/CommentForm';
import Comment from './ui/Comment';

export interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
}


export interface CommentType extends Reply {
  replies: Reply[];
}

export default function CommentSystem() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const [userDetails, setUserData] = useState<any>(null);
  const [replyContent, setReplyContent] = useState(""); // Para manejar el contenido de las respuestas

  // Cargar los comentarios
  useEffect(() => {
    const chekAuth = async () => {
      try {
        const response = await fetch('/api/controllers/verify.controller', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        if (data.isValid) {                    
          setUserData(data.userData);
        }
      } catch (error) {
        console.error('error al verficar usuario', error);
      }
    };
    chekAuth();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/elements.controllers/getForo.controller", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);

        const formattedComments = data.comentarios.map((item: any) => ({
          id: parseInt(item.usuario_id_comentario) || Date.now(),
          author: item.nombre_usuario || "Usuario Anónimo",
          avatar: '/placeholder.svg?height=40&width=40',
          content: item.texto_comentario,
          date: new Date().toISOString().split('T')[0],
          likes: parseInt(item.cantidad_likes) || 0,
          isLiked: false,
          replies: [], 
        }));

        setComments(formattedComments);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  // Cargar las respuestas y asociarlas a los comentarios correspondientes
  useEffect(() => {
    if (!repliesLoaded) {
      const fetchReplies = async () => {
        try {
          const response = await fetch("/api/elements.controllers/getForoReplies.controller", {
            method: "GET",
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          console.log(data);

          const updatedComments = [...comments];

          data.respuestas.forEach((reply: any) => {
            const parentCommentIndex = updatedComments.findIndex(
              (comment) => comment.id === parseInt(reply.comentario_id_respuesta)
            );

            if (parentCommentIndex !== -1) {
              updatedComments[parentCommentIndex].replies.push({
                id: parseInt(reply.usuario_id_respuesta),
                author: reply.nombre_usuario || 'Usuario Anónimo',
                avatar: '/placeholder.svg?height=40&width=40',
                content: reply.texto_respuesta,
                date: new Date().toISOString().split('T')[0],
                likes: parseInt(reply.cantidad_likes_respuestas) || 0,
                isLiked: false,
              });
            }
          });

          setComments(updatedComments);
          setRepliesLoaded(true); // Marcar que las respuestas ya fueron cargadas
        } catch (error: any) {
          setError(error.message);
        }
      };

      fetchReplies();
    }
  }, [comments, repliesLoaded]);

  if (isLoading) return <p>Cargando comentarios...</p>;
  if (error) return <p>Error al cargar comentarios: {error}</p>;

  const addComment = (content: string) => {
    const newComment: CommentType = {
      id: Date.now(),
      author: `${userDetails?.nombre} ${userDetails?.paterno}`,
      avatar: '/placeholder.svg?height=40&width=40',
      content,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      isLiked: false,
      replies: [],
    };
    setComments([newComment, ...comments]);
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
            ),
          };
        }
        return comment;
      })
    );
  };

  const addReply = (commentId: number, replyContent: string) => {
    if (replyContent.trim()) {
      const newReply: Reply = {
        id: Date.now(),
        author: `${userDetails?.nombre} ${userDetails?.paterno}`,
        avatar: '/placeholder.svg?height=40&width=40',
        content: replyContent,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        isLiked: false,
      };

      setComments(prevComments =>
        prevComments.map(comment =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );
    }
  };

  return (
    <div className="comment-system">
      <h1>Foro</h1>
      <CommentForm onSubmit={addComment} />
      <div className="comments-list">
        {comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            handleLike={handleLike}
            addReply={addReply} // Pasar la función para agregar respuestas
          />
        ))}
      </div>
    </div>
  );
}
