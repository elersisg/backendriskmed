const usuarioService = require('../services/usuario.service.js');

// Crear un nuevo usuario
const createUsuario = async (req, res, next) => {
    try {
        const { rol, nombre, email, contrasena, status_usuario } = req.body; // Inputs desde el cuerpo de la solicitud
        const usuario = await usuarioService.createUsuario({ rol, nombre, email, contrasena, status_usuario });
        res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
    } catch (error) {
        next(error); // Enviar errores al middleware de manejo de errores
    }
};

// Autenticar usuario (login)
const loginUsuario = async (req, res, next) => {
    try {
        const { email, contrasena } = req.body; // Inputs desde el cuerpo de la solicitud
        const usuario = await usuarioService.loginUsuario(email, contrasena);
        res.status(200).json({ message: 'Autenticación exitosa', usuario });
    } catch (error) {
        next(error);
    }
};

// Actualizar usuario por ID
const updateUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params; // Input desde los parámetros de la URL
        const { contrasena, email, status_usuario } = req.body; // Inputs desde el cuerpo de la solicitud
        const usuario = await usuarioService.updateUsuario(id_usuario, { contrasena, email, status_usuario });
        res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario });
    } catch (error) {
        next(error);
    }
};

// Obtener usuario por ID (funcionalidad adicional)
const getUsuarioById = async (req, res, next) => {
    try {
        const { id_usuario } = req.params; // Input desde los parámetros de la URL
        const usuario = await usuarioService.getUsuarioById(id_usuario);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
};

const deleteUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params; // Input desde los parámetros de la URL
        await usuarioService.deleteUsuario(id_usuario);
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        next(error); // Manejo de errores
    }
};

module.exports = {
    createUsuario,
    loginUsuario,
    updateUsuario,
    getUsuarioById,
    deleteUsuario,
};
