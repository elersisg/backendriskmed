const { poolPromise } = require('../config/dbConfig.js');

// Insertar un nuevo usuario
const insertUsuario = async (rol, nombre, email, contrasena, status_usuario) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('rol', rol)
        .input('nombre', nombre)
        .input('email', email)
        .input('contrasena', contrasena)
        .input('status_usuario', status_usuario)
        .execute('InsertUsuario');
    return result.recordset[0];
};

// Autenticar usuario
const authenticateUsuario = async (email, contrasena) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('email', email)
        .input('contrasena', contrasena)
        .execute('AuthenticateUsuario');
    return result.recordset[0];
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
    return result.recordset[0];
};

// Obtener usuario por ID
const getUsuarioById = async (id_usuario) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_usuario', id_usuario)
        .query('SELECT * FROM Usuario WHERE id_usuario = @id_usuario');
    return result.recordset[0];
};

const deleteUsuario = async (id_usuario) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_usuario', id_usuario)
        .query('DELETE FROM Usuario WHERE id_usuario = @id_usuario');
    return result.rowsAffected[0] > 0; // Retorna `true` si se eliminó el usuario, `false` si no.
};

module.exports = {
    insertUsuario,
    authenticateUsuario,
    updateUsuario,
    getUsuarioById,
    deleteUsuario,
};


// kel oejlkajflasjfoiajfp oawjf jawfs