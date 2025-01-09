const Joi = require('joi');

// DTO para actualizar un nivel de riesgo
const UpdateNivelRiesgoDTO = Joi.object({
    nombre_riesgo: Joi.string().max(20).optional(), // Nombre del riesgo (opcional, máximo 20 caracteres)
    puntuacion: Joi.number().integer().optional(), // Puntuación (opcional, debe ser un número entero)
});

// DTO para validar el ID de nivel de riesgo
const GetNivelRiesgoByIdDTO = Joi.object({
    id_nivelriesgo: Joi.number().integer().positive().required(), // ID debe ser entero positivo y obligatorio
});

module.exports = {
    UpdateNivelRiesgoDTO,
    GetNivelRiesgoByIdDTO,
};
