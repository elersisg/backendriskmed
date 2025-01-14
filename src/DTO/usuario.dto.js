const Joi = require('joi');

// DTO para crear un nuevo usuario
const InsertUsuarioDTO = Joi.object({
    rol: Joi.string().max(20).required(), // Rol del usuario (obligatorio)
    nombre: Joi.string().max(100).required(), // Nombre completo del usuario (obligatorio)
    email: Joi.string().email().max(150).required(), // Correo electrónico válido (obligatorio)
    contrasena: Joi.string().min(6).max(256).required(), // Contraseña segura (obligatorio)
    status_usuario: Joi.string().valid('Activo', 'Inactivo').required(), // Estado del usuario (obligatorio)
});

// DTO para autenticar un usuario
const LoginUsuarioDTO = Joi.object({
    email: Joi.string().email().max(150).required(), // Correo electrónico válido (obligatorio)
    contrasena: Joi.string().min(6).max(256).required(), // Contraseña segura (obligatorio)
});

// DTO para actualizar un usuario
const UpdateUsuarioDTO = Joi.object({
    contrasena: Joi.string().min(6).max(256).optional(), // Contraseña (opcional)
    email: Joi.string().email().max(150).optional(), // Correo electrónico válido (opcional)
    status_usuario: Joi.string().valid('Activo', 'Inactivo').optional(), // Estado del usuario (opcional)
});

module.exports = {
    InsertUsuarioDTO,
    LoginUsuarioDTO,
    UpdateUsuarioDTO,
};
