const Joi = require('joi');

// DTO para crear un nuevo administrador
const CreateAdminDTO = Joi.object({
    id_usuario: Joi.number().integer().positive().required(), // FK a la tabla Usuario (obligatorio)
    cedula_admin: Joi.string().length(11).required(), // Número de cédula (obligatorio)
});

// DTO para validar el ID de un administrador
const GetAdminByIdDTO = Joi.object({
    id_admin: Joi.number().integer().positive().required(), // ID del administrador (obligatorio)
});

module.exports = {
    CreateAdminDTO,
    GetAdminByIdDTO,
};
