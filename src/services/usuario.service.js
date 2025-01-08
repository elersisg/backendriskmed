const usuarioModel = require('../models/usuario.model.js'); 

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

// Obtener usuario por ID (funcionalidad adicional)
const getUsuarioById = async (id_usuario) => {
    return await usuarioModel.getUsuarioById(id_usuario);
};

const deleteUsuario = async (id_usuario) => {
    const result = await usuarioModel.deleteUsuario(id_usuario);
    if (!result) throw new Error('Usuario no encontrado');
    return result;
};

module.exports = {
    createUsuario,
    loginUsuario,
    updateUsuario,
    getUsuarioById,
    deleteUsuario,
};
