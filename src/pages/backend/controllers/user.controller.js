import { pool } from "../db.js";


//Obtener todos los usuarios
export const getUsers = async (req, res) => {

    const { rows } = await pool.query('SELECT * FROM usuarios ORDER BY usuario_id')
    console.log(rows);
    console.log("Received request for getUsers");
    res.json(rows)
}

//Obtener usuario por id
export const getUser = async (req, res) => {
    const { userid } = req.params
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE usuario_id = $1', [userid])

    if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" })
    }

    return res.json(rows[0])
}

//Crear usuario
export const createUser = async (req, res) => {

    try {
        const datos = req.body
        console.log(datos);

        const { rows } = await pool.query('INSERT INTO usuarios (usuario_nombre, usuario_apellido_paterno, usuario_apellido_materno, usuario_correo, usuario_contraseña) VALUES ($1, $2, $3, $4, $5) RETURNING *', [datos.Nombre, datos.Paterno, datos.Materno, datos.Correo, datos. Contraseña])

        return res.json(rows[0])
    } 
    catch (error) {
        if (error?.code === "23505") {
            return res.status(409).json({message: "Email already exists"})
        }
        return res.status(500).json({message: "internal server error"})
    }
}

//Eliminar Usuario

export const deleteUser = async (req, res) => {
    const { userid } = req.params
    const { rowCount } = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userid])

    if (rowCount.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" })
    }


    return res.status(204)
}

// Actualizar Usuario

export const updateUser = async (req, res) => {
    const { userid } = req.params;
    const datos = req.body;
    const { rows } = await pool.query("UPDATE users SET user_name = $1, email = $2 WHERE user_id = $3 RETURNING *", [datos.user_name, datos.email, userid])
    return res.json(rows[0])

}