import type { APIRoute } from "astro";
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

export const GET: APIRoute = async ({ request }: { request: Request }) => {
    const cookies = parse(request.headers.get('cookie') || '');
    const token = cookies.jwt;

    if (!token) {
        JSON.stringify({ isValid: false }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
    };

    try {
        const secret = import.meta.env.JWT_SECRET
        const decoded = jwt.verify(token, secret)

        return new Response(
            JSON.stringify({ isValid: true, userData: decoded}),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error al verificar el token: ', error);

        return new Response(
            JSON.stringify({ isValid: false }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );

    }
}