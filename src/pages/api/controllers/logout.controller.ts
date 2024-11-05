import type { APIRoute } from 'astro';
import { serialize } from 'cookie';

export const GET: APIRoute = async ({ request }) => {
  const cookieOptions = serialize('jwt', '', {
    httpOnly: true,
    sameSite: 'strict',    
    path: '/',             
    maxAge: -1,            
    expires: new Date(0),  
  });

  return new Response(
    JSON.stringify({ message: 'Logged out successfully' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieOptions,  
      },
    }
  );
};
