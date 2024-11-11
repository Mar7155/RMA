import type { APIRoute } from "astro";
import { pool } from "../db.ts";

export const GET: APIRoute = async () => {
    try {
        const query = `SELECT DISTINCT
                comentarios.comentarios_texto,
                comentarios.usuario_id,
                comentarios.tutores_id,
                likes.usuario_id as useriddellike,
                likes.comentarios_id as comentariodellike,
                respuestas.comentarios_id as comentarioiddelarespuesta,
                respuestas.usuario_id as usuario_iddelarespuesta,
                respuestas.respuesta_texto
                FROM
                    comentarios
                JOIN likes ON comentarios.comentarios_id = likes.comentarios_id
                JOIN respuestas ON respuestas.respuesta_id = likes.comentarios_id`;
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
