import type { APIRoute } from "astro";
import { pool } from "../db.ts";

export const GET: APIRoute = async () => {
    try {
        const query = `SELECT DISTINCT ON (recursos.recursos_titulo)
                recursos.recursos_id,
                recursos.recursos_titulo,
                recursos.recursos_descripcion,
                recursos.recursos_fecha,
                recursos.recursos_url,
                tipos.tipo_nombre,
                areas.areas_nombre

                FROM
                    recursos
                JOIN recursos_tipos ON recursos.recursos_id = recursos_tipos.recursos_id
                JOIN tipos ON tipos.tipo_id = recursos_tipos.tipo_id
                JOIN recursos_areas ON recursos.recursos_id = recursos_areas.recursos_id
                JOIN areas ON areas.areas_id = recursos_areas.areas_id`;

        const query2 = `SELECT * FROM tipos`
        const query3 = `SELECT * FROM areas`

        const result = await pool.query(query);
        const result2 = await pool.query(query2);
        const result3 = await pool.query(query3);

        if (result.rows.length === 0 && result2.rows.length === 0 && result3.rows.length === 0) {
            return new Response(
                JSON.stringify({ message: "No se encontraron recursos." }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                recursos: result.rows,
                temas: result2.rows,
                tipos: result3.rows,
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