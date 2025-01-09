const Joi = require('joi');

// DTO para crear una nueva solicitud
const CreateSolicitudDTO = Joi.object({
    id_subcategoria: Joi.number().integer().positive().required(), // FK a Subcategoria_med
    id_medicamento: Joi.number().integer().positive().required(), // FK a Medicamento
    id_proveedor: Joi.number().integer().positive().required(), // FK a Proveedor
    metodo_produccion: Joi.string().max(150).required(), // Método de producción
    cantidad_med: Joi.number().integer().positive().required(), // Cantidad de medicamento
    status_solicitud: Joi.string().max(50).required(), // Estado de la solicitud
    comentario: Joi.string().max(255).optional(), // Comentario opcional
});

// DTO para actualizar el estado y comentario de una solicitud
const UpdateSolicitudStatusDTO = Joi.object({
    status_solicitud: Joi.string().max(50).required(), // Nuevo estado
    comentario: Joi.string().max(255).optional(), // Comentario opcional
});

module.exports = {
    CreateSolicitudDTO,
    UpdateSolicitudStatusDTO,
};
