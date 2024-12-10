import React, { useState, useEffect } from "react";
import CommentForm from "./ui/CommentForm";
import Comment from "./ui/Comment";

export interface Reply {
  id: number;
  author: string;
  avatar: string;
  content: string;
  comment: number;
  date: string;
  likes: number;
  isLiked: boolean;
}

interface LikeInfo {
  comment_id: number;
  reply_id?: number | null; // Opcional o puede ser null
  user_id: number;
  comment: boolean;
  isLiked: boolean;
}

export interface CommentType extends Reply {
  replies: Reply[];
}

export default function CommentSystem() {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const userData = localStorage.getItem("user");
        const dataArray = userData ? JSON.parse(userData) : null;
        setUserDetails(dataArray);

        const response = await fetch("http://localhost:3000/getComments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        const formattedComments = data.map((item: any) => ({
          id: item.comentario_id,
          author: `${item.usuario.usuario_nombre} ${item.usuario.usuario_apellidos}`,
          avatar: "/placeholder.svg?height=40&width=40",
          content: item.comentario_texto,
          date: new Date(item.fecha_reg).toLocaleDateString(),
          likes: item.likes.length,
          isLiked: item.likes.some((like: any) => like.usuario_id === dataArray?.id), // Verificar si el usuario dio like
          replies: item.respuestas.map((reply: any) => ({
            id: reply.respuesta_id,
            author: `${reply.usuario.usuario_nombre} ${reply.usuario.usuario_apellidos}`,
            avatar: "/placeholder.svg?height=40&width=40",
            content: reply.respuesta_texto,
            date: new Date(reply.respuesta_fecha).toLocaleDateString(),
            likes: reply.likesRespuestas.length,
            isLiked: reply.likesRespuestas.some((like: any) => like.usuario_id === dataArray?.id),
          })),
        }));

        setComments(formattedComments);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);




  if (isLoading) return <p>Cargando comentarios... ^^</p>;
  if (error) return <p>Error al cargar comentarios: {error}</p>;

  const addComment = async (content: string) => {
    const newComment: CommentType = {
      id: userDetails?.id,
      author: `${userDetails?.nombre || "Usuario"} ${userDetails?.apellidos || ""}`,
      avatar: "/placeholder.svg?height=40&width=40",
      content,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      isLiked: false,
      replies: [],
      comment: 0
    };

    setComments([newComment, ...comments]);
    try {
      const response = await fetch("http://localhost:3000/saveComment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        console.error("uy, error al guardar el comentario");
        return;
      }

    } catch (error) {
      console.error("error al postear ;( " + error);

    }

  };

  const handleLike = async (commentId: number, isReply: boolean = false, parentId?: number) => {
    const likeUpdates: LikeInfo[] = []; // Inicialización vacía
  
    const updatedComments = comments.map((comment) => {
      if (!isReply && comment.id === commentId) {
        likeUpdates.push({
          comment_id: commentId,
          user_id: userDetails.id,
          comment: true,
          isLiked: !comment.isLiked,
        });
  
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked,
        };
      } else if (isReply && parentId && comment.id === parentId) {
        const updatedReplies = comment.replies.map((reply) => {
          if (reply.id === commentId) {
            likeUpdates.push({
              comment_id: reply.id,
              user_id: userDetails.id,
              comment: false,
              isLiked: !reply.isLiked,
            });
  
            return {
              ...reply,
              likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
              isLiked: !reply.isLiked,
            };
          }
          return reply;
        });
  
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });
  
    const likeInfo = likeUpdates[0]
    setComments(updatedComments);
    
      try {
        const response = await fetch("http://localhost:3000/saveLike", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(likeInfo), // Array completo
        });
  
        if (!response.ok) {
          console.error("Error al guardar el like");
        }
      } catch (error) {
        console.error("Error al enviar la solicitud de like: ", error);
      }
  };
  
  


  const addReply = async (commentId: number, replyContent: string) => {
    if (replyContent.trim()) {
      const newReply: Reply = {
        id: userDetails.id,
        author: `${userDetails?.nombre || "Usuario"} ${userDetails?.apellidos || ""}`,
        avatar: "/placeholder.svg?height=40&width=40",
        content: replyContent,
        comment: commentId,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
        isLiked: false,
      };

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, newReply] }
            : comment
        )
      );

      try {
        const response = await fetch("http://localhost:3000/saveReply", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newReply),
        });

        if (!response.ok) {
          console.error("uy, error al guardar la respuesta");
          return;
        }

      } catch (error) {
        console.error("error al guardar la respuesta: " + error);


      }
    }
  };

  return (
    <div className="comment-system">
      <h1 className="text-3xl mt-4 font-semibold">Foro</h1>
      <CommentForm onSubmit={addComment} />
      <div className="comments-list">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            handleLike={handleLike}
            addReply={addReply}
          />
        ))}
      </div>
    </div>
  );
}
