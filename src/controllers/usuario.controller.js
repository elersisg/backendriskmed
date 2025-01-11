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
const jwt = require('jsonwebtoken');
const usuarioService = require('../services/usuario.service');

// Inicio de sesión
const loginUsuario = async (req, res, next) => {
    try {
        const { email, contrasena } = req.body;

        // Validar credenciales
        const usuario = await usuarioService.authenticate(email, contrasena);
        if (!usuario) {
            return res.status(401).json({ message: 'Credenciales incorrectas.' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                rol: usuario.rol, // Incluye el rol del usuario
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        res.status(200).json({ token, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginUsuario,
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
