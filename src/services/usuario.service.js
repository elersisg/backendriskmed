const usuarioModel = require('../models/usuario.model');

// Crear usuario
const createUsuario = async (data) => {
    const { rol, nombre, email, contrasena, status_usuario } = data;
    return await usuarioModel.insertUsuario(rol, nombre, email, contrasena, status_usuario);
};

// Autenticar usuario
const loginUsuario = async (email, contrasena) => {
    const usuario = await usuarioModel.authenticateUsuario(email, contrasena);
    if (!usuario) throw new Error('Credenciales inválidas o usuario no encontrado');
    if (usuario.status_usuario !== 'Activo') throw new Error('Usuario inactivo');
    return usuario;
};

// Actualizar usuario
const updateUsuario = async (id_usuario, data) => {
    const { contrasena, email, status_usuario } = data;
    return await usuarioModel.updateUsuario(id_usuario, contrasena, email, status_usuario);
};

// Eliminar usuario
const deleteUsuario = async (id_usuario) => {
    const wasDeleted = await usuarioModel.deleteUsuario(id_usuario);
    if (!wasDeleted) throw new Error('Usuario no encontrado');
    return wasDeleted;
};


module.exports = {
    createUsuario,
    loginUsuario,
    updateUsuario,
    deleteUsuario,
};
