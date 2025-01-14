const Joi = require('joi');

// DTO para insertar un nuevo inspector
const CreateInspectorDTO = Joi.object({
    id_usuario: Joi.number().integer().required(),
    cedula_inspector: Joi.string().length(11).required(),
});

// DTO para filtrar inspectores por nombre
const FilterInspectorsByNameDTO = Joi.object({
    nombre: Joi.string().max(100).optional(),
});

// DTO para seleccionar inspectores sin evaluación en una fecha específica
const InspectorsWithoutEvaluationDTO = Joi.object({
    fecha: Joi.date().required(),
});

module.exports = {
    CreateInspectorDTO,
    FilterInspectorsByNameDTO,
    InspectorsWithoutEvaluationDTO,
};
