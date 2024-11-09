import type { APIRoute } from "astro";
import { pool } from "../db.ts";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from "jsonwebtoken";

interface FormData {
  Email: string;
  Contraseña: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const formData: FormData = {
      Email: data.get("email")?.toString() || '',
      Contraseña: data.get("password")?.toString() || ''
    };

    const missingFields = Object.entries(formData).filter(([_, value]) => !value).map(([key]) => key);
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          message: "Faltan los campos: " + missingFields.join(", "),
        }),
        { status: 400 }
      );
    }

    const firstValues = [formData.Email];
    //`SELECT * FROM usuarios WHERE usuario_correo = $1 AND usuario_contraseña = $2`
    try {
      const firstQuery = `SELECT * FROM usuarios WHERE usuario_correo = $1`;
      const getUser = await pool.query(firstQuery, firstValues);
      if (!getUser) {
        return new Response(
          JSON.stringify({ message: "El usuario no existe" }),
          { status: 404 }
        );
      }
      
      const userToCompare = getUser.rows[0];

      if (!await bcryptjs.compare(formData.Contraseña, userToCompare.usuario_contraseña)) {
        
        return new Response(
          JSON.stringify({ message: "Usuario o contraseña incorrectos" }),
          { status: 401 }
        );
        
      }

      const payload = {
        id: userToCompare.usuario_id,
        nombre: userToCompare.usuario_nombre,
        paterno: userToCompare.usuario_apellido_paterno,        
        materno: userToCompare.usuario_apellido_materno,
        correo: userToCompare.usuario_correo,
        plan: userToCompare.planes_id,
        fechaReg: userToCompare.usuario_fechareg
      }

      const token = jsonwebtoken.sign(
        payload, 
        import.meta.env.JWT_SECRET, 
        { expiresIn: import.meta.env.JWT_EXPIRATION })
      
      const cookieOptions = `Path=/; Max-Age=${import.meta.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60}; SameSite=Strict; httpOnly`


      return new Response(
        JSON.stringify({
          message: "Bienvenido ",
          user: payload,
          redirect: "/",
        }),
        { 
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `jwt=${token}; ${cookieOptions}`
          }
         }
      );

    } catch (error) {
      console.error("El usuario no existe", error);
      return new Response(
        JSON.stringify({ message: "El usuario no existe" }),
        { status: 404 }
      );
    }

  }
  catch (error) {
    console.error("Error durante el inicio de sesion:", error);
    return new Response(
      JSON.stringify({ message: "Error al iniciar sesion" }),
      { status: 500 }
    );
  }
};

//  try {
    //    const decoded = jsonwebtoken.verify(token, import.meta.env.JWT_SECRET);
    //    console.log(decoded); // Aquí tienes los datos decodificados
    //} catch (err) {
    //    console.error('Token inválido:', err);
    //}
     // const twoValues = [formData.Email];
      //const secondQuery = `SELECT * FROM usuarios WHERE usuario_correo = $1 AND usuario_contraseña = $2`;      
      //const user = await pool.query(secondQuery, twoValues);