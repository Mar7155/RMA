import type { APIRoute } from "astro";
import { pool } from "../db.ts";
import bcryptjs from 'bcryptjs'; 

interface FormData {
  Nombre: string;
  Paterno: string;
  Materno: string;
  Email: string;
  Contraseña: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const formData: FormData = {
      Nombre: data.get("nombre")?.toString() || '',
      Paterno: data.get("apellido-paterno")?.toString() || '',
      Materno: data.get("apellido-materno")?.toString() || '',
      Email: data.get("email")?.toString() || '',
      Contraseña: data.get("password")?.toString() || ''
    };

    const missingFields = Object.entries(formData).filter(([_, value]) => !value).map(([key]) => key);
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          message: "Faltan campos requeridos: " + missingFields.join(", "),
        }),
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(5)
    const hashedContraseña = await bcryptjs.hash(formData.Contraseña, salt);

    const values = [formData.Nombre, formData.Paterno, formData.Materno, formData.Email, hashedContraseña];
    
    const query = `INSERT INTO usuarios (usuario_nombre, usuario_apellido_paterno, usuario_apellido_materno, usuario_correo, usuario_contraseña)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`; 

    const result = await pool.query(query, values);

    return new Response(
      JSON.stringify({
        message: "¡Éxito!",
        userId: result.rows[0].id,
        redirect: "/Login",
      }),
      { status: 201 } 
    );
  } 
  catch (error) {
    console.error("Error durante el registro de usuario:", error); 
    return new Response(
      JSON.stringify({ message: "Error al registrarse" }),
      { status: 500 }
    );
  }
};