const { poolPromise } = require('../config/dbConfig.js');

// Insertar un nuevo usuario
const insertUsuario = async (data) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('username', data.username)
        .input('email', data.email)
        .input('password', data.password)
        .input('rnc', data.rnc)
        .input('ubicacion', data.ubicacion)
        .input('telefono', data.telefono)
        .execute('InsertUsuario'); // Nombre del procedimiento almacenado
    return result.recordset[0];
};

// Autenticar usuario
const authenticateUsuario = async (email, contrasena) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('email', email)
        .input('contrasena', contrasena)
        .execute('AuthenticateUsuario');
    return result.recordset[0]; // Retorna los datos del usuario autenticado
};

// Actualizar usuario
const updateUsuario = async (id_usuario, contrasena, email, status_usuario) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_usuario', id_usuario)
        .input('contrasena', contrasena)
        .input('email', email)
        .input('status_usuario', status_usuario)
        .execute('UpdateUsuario');
    return result.recordset[0]; // Retorna los datos actualizados del usuario
};

// Eliminar usuario
const deleteUsuario = async (id_usuario) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_usuario', id_usuario)
        .query('DELETE FROM Usuario WHERE id_usuario = @id_usuario');
    return result.rowsAffected[0] > 0; // Retorna true si se eliminó el usuario, false si no
};

const getUsuarioByEmail = async (email) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('email', email)
        .execute('GetUsuarioByEmail'); // Nombre del procedimiento almacenado
    return result.recordset[0];
};

module.exports = {
    insertUsuario,
    authenticateUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioByEmail, 
};
