const Joi = require('joi');

const CreateInspectorDTO = Joi.object({
    id_usuario: Joi.number().integer().required().messages({
        'number.base': 'El campo id_usuario debe ser un número.',
        'any.required': 'El campo id_usuario es obligatorio.',
    }),
    cedula_inspector: Joi.string().length(11).required().messages({
        'string.length': 'La cédula debe tener exactamente 11 caracteres.',
        'any.required': 'El campo cedula_inspector es obligatorio.',
    }),
});

const InspectorsWithoutEvaluationDTO = Joi.object({
    fecha: Joi.date().required().messages({
        'date.base': 'El campo fecha debe ser una fecha válida.',
        'any.required': 'El campo fecha es obligatorio.',
    }),
});

module.exports = {
    CreateInspectorDTO,
    InspectorsWithoutEvaluationDTO,
};