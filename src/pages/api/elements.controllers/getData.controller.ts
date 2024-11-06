import type { APIRoute } from "astro";
import { pool } from "../db.ts";

export const GET: APIRoute = async () => {
    try {
        const query = `SELECT * FROM videos`;
        const result = await pool.query(query);

        if (result.rows.length === 0) {
            return new Response(
                JSON.stringify({ message: "No se encontraron videos." }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                videos: result.rows,
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
