import { neon } from '@neondatabase/serverless';

export async function GET() {
 const sql = neon(import.meta.env.DATABASE_URL);
 const response = await sql`SELECT version()`;
 return new Response(JSON.stringify(response[0]), {
 headers: { 'Content-Type': 'application/json' },
 });
}