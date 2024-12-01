import type { APIRoute } from "astro";
import { pool } from "../db.ts";

export const GET: APIRoute = async () => {
    try {
        const query = `SELECT 
        comentarios.comentarios_id as id_comentario,
        comentarios.comentarios_texto as texto_comentario,
        comentarios.usuario_id as usuario_id_comentario,
        comentarios.comentarios_fechareg as fecha_comentario,
        COUNT(likes.comentarios_id) as cantidad_likes,
        usuarios.usuario_nombre as nombre_usuario

FROM
    comentarios
LEFT JOIN 
    likes ON comentarios.comentarios_id = likes.comentarios_id
JOIN 
    usuarios ON usuarios.usuario_id = comentarios.usuario_id

GROUP BY 
    comentarios.comentarios_id,
    comentarios.usuario_id,
    comentarios.comentarios_texto,
    comentarios.comentarios_fechareg,
    usuarios.usuario_nombre
`;
        const result = await pool.query(query);

        if (result.rows.length === 0) {
            return new Response(
                JSON.stringify({ message: "No se encontraron comentarios." }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                comentarios: result.rows,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error("Problemas al recuperar datos:", error);
        return new Response(
            JSON.stringify({ message: "Error interno del servidor." }),
            { status: 500 }
        );
    }
};
