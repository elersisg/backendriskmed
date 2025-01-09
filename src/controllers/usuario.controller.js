const usuarioService = require('../services/usuario.service');
const { CreateUsuarioDTO, LoginUsuarioDTO, UpdateUsuarioDTO } = require('../DTO/usuario.dto.js');

// Crear un nuevo usuario
const createUsuario = async (req, res, next) => {
    try {
        const validatedData = await CreateUsuarioDTO.validateAsync(req.body);
        const usuario = await usuarioService.createUsuario(validatedData);
        res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
    } catch (error) {
        next(error);
    }
};

// Autenticar usuario
const loginUsuario = async (req, res, next) => {
    try {
        const validatedData = await LoginUsuarioDTO.validateAsync(req.body);
        const usuario = await usuarioService.loginUsuario(validatedData.email, validatedData.contrasena);
        res.status(200).json({ message: 'Autenticación exitosa', usuario });
    } catch (error) {
        next(error);
    }
};

// Actualizar usuario
const updateUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
        const validatedData = await UpdateUsuarioDTO.validateAsync(req.body);
        const usuario = await usuarioService.updateUsuario(id_usuario, validatedData);
        res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario });
    } catch (error) {
        next(error);
    }
};

// Eliminar usuario
const deleteUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params; // ID del usuario desde la URL
        await usuarioService.deleteUsuario(id_usuario);
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUsuario,
    loginUsuario,
    updateUsuario,
    deleteUsuario,
};
