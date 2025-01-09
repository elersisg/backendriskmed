const Joi = require('joi');

// DTO para crear un nuevo inspector
const CreateInspectorDTO = Joi.object({
    id_usuario: Joi.number().integer().positive().required(), // FK a la tabla Usuario (obligatorio)
    cedula_inspector: Joi.string().length(11).required(), // Número de cédula (obligatorio)
});

// DTO para filtrar inspectores por nombre
const FilterInspectoresByNombreDTO = Joi.object({
    nombre: Joi.string().max(100).optional(), // Filtro por nombre (opcional)
});

module.exports = {
    CreateInspectorDTO,
    FilterInspectoresByNombreDTO,
};
