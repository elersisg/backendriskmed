const Joi = require('joi');

// DTO para crear una nueva evaluación
const CreateEvaluacionDTO = Joi.object({
    id_proveedor: Joi.number().integer().positive().required(), // FK a Proveedor
    id_categoria_nivel: Joi.number().integer().positive().required(), // FK a Categoria_nivel
    id_inspector: Joi.number().integer().positive().required(), // FK a Inspector
    riesgo_establecimiento: Joi.number().precision(3).positive().allow(null), // Riesgo del establecimiento
    resultado: Joi.number().precision(3).positive().allow(null), // Resultado de la evaluación
    observacion: Joi.string().max(255).optional().allow(null), // Observaciones opcionales
    fecha: Joi.date().required(), // Fecha de la evaluación
    status_evaluacion: Joi.string().max(50).required(), // Estado de la evaluación
});

// DTO para actualizar una evaluación
const UpdateEvaluacionDTO = Joi.object({
    id_categoria_nivel: Joi.number().integer().positive().required(), // FK a Categoria_nivel
    riesgo_establecimiento: Joi.number().precision(3).positive().required(),
    resultado: Joi.number().precision(3).positive().required(),
    observacion: Joi.string().max(255).optional().allow(null),
    status_evaluacion: Joi.string().max(50).required(),
});

module.exports = {
    CreateEvaluacionDTO,
    UpdateEvaluacionDTO,
};
