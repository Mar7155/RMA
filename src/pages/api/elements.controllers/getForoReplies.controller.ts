import type { APIRoute } from "astro";
import { pool } from "../db.ts";

export const GET: APIRoute = async () => {
    try {
        const query = `SELECT 
        respuestas.usuario_id as usuario_id_respuesta,
        respuestas.respuesta_texto as texto_respuesta,
        COUNT(likes_respuestas.respuesta_id) as cantidad_likes_respuestas,
        respuestas.comentarios_id as comentario_id_respuesta,
        respuestas.respuesta_fecha as fecha_respuesta,
        usuarios.usuario_nombre as nombre_usuario

FROM
    respuestas
LEFT JOIN 
    likes_respuestas ON respuestas.respuesta_id = likes_respuestas.respuesta_id
JOIN
    usuarios ON usuarios.usuario_id = respuestas.usuario_id

GROUP BY 
    respuestas.usuario_id,
    respuestas.respuesta_texto,
    respuestas.comentarios_id,
    respuestas.respuesta_fecha,
    usuarios.usuario_nombre;
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
                respuestas: result.rows,
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
