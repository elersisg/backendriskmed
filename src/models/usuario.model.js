const { connectToDatabase } = require('../config/dbConfig.js');

// Insertar un nuevo usuario
const insertUsuario = async (rol, nombre, email, contrasena, status_usuario) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('rol', rol)
            .input('nombre', nombre)
            .input('email', email)
            .input('contrasena', contrasena)
            .input('status_usuario', status_usuario)
            .execute('InsertUsuario');
        return result.recordset[0];
    } catch (error) {
        console.error('Error en insertUsuario:', error.message);
        throw error;
    }
};

// Autenticar usuario
const authenticateUsuario = async (email, contrasena) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('email', email)
            .input('contrasena', contrasena)
            .execute('AuthenticateUsuario');
        return result.recordset[0]; // Retorna los datos del usuario autenticado
    } catch (error) {
        console.error('Error en authenticateUsuario:', error.message);
        throw error;
    }
};

// Buscar usuario por email
const findUsuarioByEmail = async (email) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('email', email)
            .query('SELECT * FROM Usuario WHERE email = @email');
        return result.recordset[0]; // Retorna el usuario encontrado o undefined si no existe
    } catch (error) {
        console.error('Error en findUsuarioByEmail:', error.message);
        throw error;
    }
};

// Actualizar usuario
const updateUsuario = async (id_usuario, contrasena, email, status_usuario) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_usuario', id_usuario)
            .input('contrasena', contrasena)
            .input('email', email)
            .input('status_usuario', status_usuario)
            .execute('UpdateUsuario');
        return result.recordset[0];
    } catch (error) {
        console.error('Error en updateUsuario:', error.message);
        throw error;
    }
};

// Eliminar usuario
const deleteUsuario = async (id_usuario) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_usuario', id_usuario)
            .query('DELETE FROM Usuario WHERE id_usuario = @id_usuario');
        return result.rowsAffected[0] > 0;
    } catch (error) {
        console.error('Error en deleteUsuario:', error.message);
        throw error;
    }
};

module.exports = {
    insertUsuario,
    authenticateUsuario,
    findUsuarioByEmail, // Exporta el nuevo método
    updateUsuario,
    deleteUsuario,
};
