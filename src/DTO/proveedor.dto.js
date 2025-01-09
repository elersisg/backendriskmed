const Joi = require('joi');

// DTO para crear un nuevo proveedor
const CreateProveedorDTO = Joi.object({
    id_categoria_nivel: Joi.number().integer().positive().required(), // FK a la tabla Categoria_nivel
    id_usuario: Joi.number().integer().positive().required(), // FK a la tabla Usuario
    RNC: Joi.string().length(11).required(), // Registro Nacional de Contribuyentes (obligatorio)
    ubicacion: Joi.string().max(255).required(), // Ubicación del proveedor (obligatorio)
    fecha_ultima_evaluacion: Joi.date().required(), // Fecha de última evaluación (obligatorio)
    fecha_proxima_evaluacion: Joi.date().required(), // Fecha de próxima evaluación (obligatorio)
});

// DTO para actualizar la ubicación del proveedor
const UpdateProveedorUbicacionDTO = Joi.object({
    ubicacion: Joi.string().max(255).required(), // Nueva ubicación (obligatorio)
});

module.exports = {
    CreateProveedorDTO,
    UpdateProveedorUbicacionDTO,
};
