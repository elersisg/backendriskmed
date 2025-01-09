const Joi = require('joi');

// DTO para crear una nueva complejidad
const CreateComplejidadDTO = Joi.object({
    nombre_complejidad: Joi.string().max(50).required(), // Nombre de la complejidad (obligatorio)
    id_medicamento: Joi.number().integer().positive().optional(), // FK al medicamento (opcional)
});

// DTO para validar el ID de una complejidad
const GetComplejidadByIdDTO = Joi.object({
    id_complejidad: Joi.number().integer().positive().required(), // ID de la complejidad (obligatorio)
});

module.exports = {
    CreateComplejidadDTO,
    GetComplejidadByIdDTO,
};
