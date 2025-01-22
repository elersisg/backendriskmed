<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const usuarioService = require('../services/usuario.service');
const { CreateUsuarioDTO, LoginUsuarioDTO, UpdateUsuarioDTO } = require('../DTO/usuario.dto');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
const createUsuario = async (req, res, next) => {
    try {
        const validatedData = await CreateUsuarioDTO.validateAsync(req.body);

        // Encriptar la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(validatedData.contrasena, 10);
        validatedData.contrasena = hashedPassword;

        // Crear el usuario
        const usuario = await usuarioService.createUsuario(validatedData);

        // Generar el token JWT
        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || '1h' }
        );

        // Enviar la respuesta con el token y los datos del usuario
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            },
            token // Incluir el token en la respuesta
        });
    } catch (error) {
        next(error);
    }
};

// Autenticar usuario
const loginUsuario = async (req, res, next) => {
    try {
        const validatedData = await LoginUsuarioDTO.validateAsync(req.body);

        // Buscar usuario por email
        const usuario = await usuarioService.findUsuarioByEmail(validatedData.email); // Asegúrate de que este método exista en `usuarioService`
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Comparar contraseñas usando bcrypt
        const isPasswordValid = await bcrypt.compare(validatedData.contrasena, usuario.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id_usuario: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || '1h' }
        );

        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id_usuario: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Actualizar usuario
const updateUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
        const validatedData = await UpdateUsuarioDTO.validateAsync(req.body);

        // Si se incluye una nueva contraseña, encriptarla antes de actualizar
        if (validatedData.contrasena) {
            validatedData.contrasena = await bcrypt.hash(validatedData.contrasena, 10);
        }

        const usuario = await usuarioService.updateUsuario(id_usuario, validatedData);
        res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario });
    } catch (error) {
        next(error);
    }
};

// Eliminar usuario
const deleteUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
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
=======
const jwt = require('jsonwebtoken');
const usuarioService = require('../services/usuario.service');
const { CreateUsuarioDTO, LoginUsuarioDTO, UpdateUsuarioDTO } = require('../DTO/usuario.dto');
const bcrypt = require('bcrypt');

// Crear un nuevo usuario
const createUsuario = async (req, res, next) => {
    try {
        const validatedData = await CreateUsuarioDTO.validateAsync(req.body);

        // Encriptar la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(validatedData.contrasena, 10);
        validatedData.contrasena = hashedPassword;

        // Crear el usuario
        const usuario = await usuarioService.createUsuario(validatedData);

        // Generar el token JWT
        const token = jwt.sign(
            { id_usuario: usuario.id_usuario, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || '1h' }
        );

        // Enviar la respuesta con el token y los datos del usuario
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            usuario: {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            },
            token // Incluir el token en la respuesta
        });
    } catch (error) {
        next(error);
    }
};


// Autenticar usuario
const loginUsuario = async (req, res, next) => {
    try {
        const validatedData = await LoginUsuarioDTO.validateAsync(req.body);

        // Buscar usuario por email
        const usuario = await usuarioService.findUsuarioByEmail(validatedData.email); // Asegúrate de que este método exista en `usuarioService`
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Comparar contraseñas usando bcrypt
        const isPasswordValid = await bcrypt.compare(validatedData.contrasena, usuario.contrasena);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id_usuario: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || '1h' }
        );

        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id_usuario: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Actualizar usuario
const updateUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
        const validatedData = await UpdateUsuarioDTO.validateAsync(req.body);

        // Si se incluye una nueva contraseña, encriptarla antes de actualizar
        if (validatedData.contrasena) {
            validatedData.contrasena = await bcrypt.hash(validatedData.contrasena, 10);
        }

        const usuario = await usuarioService.updateUsuario(id_usuario, validatedData);
        res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario });
    } catch (error) {
        next(error);
    }
};

// Eliminar usuario
const deleteUsuario = async (req, res, next) => {
    try {
        const { id_usuario } = req.params;
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
>>>>>>> 27d4cdbd385fa3bdc494563c98af4402bc94c238
