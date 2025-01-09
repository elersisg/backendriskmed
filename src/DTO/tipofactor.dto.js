const Joi = require('joi');

// DTO para crear un nuevo tipo de factor
const CreateTipoFactorDTO = Joi.object({
    nombre: Joi.string().max(100).required(), // Nombre del tipo de factor (obligatorio)
});

// DTO para validar el ID de un tipo de factor
const GetTipoFactorByIdDTO = Joi.object({
    id_tipo_factor: Joi.number().integer().positive().required(), // ID del tipo de factor (obligatorio)
});

module.exports = {
    CreateTipoFactorDTO,
    GetTipoFactorByIdDTO,
};
