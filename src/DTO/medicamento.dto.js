const Joi = require('joi');

// DTO para insertar un nuevo medicamento
const CreateMedicamentoDTO = Joi.object({
    id_complejidad: Joi.number().integer().positive().required(), // FK a la tabla Complejidad_med
    nombre_med: Joi.string().max(100).required(), // Nombre del medicamento (obligatorio)
    efectos_secundarios: Joi.string().allow(null, '').optional(), // Efectos secundarios (opcional)
    funcion_med: Joi.string().max(230).required(), // Función principal (obligatorio)
    status_medicamento: Joi.string().max(50).required(), // Estado del medicamento (obligatorio)
});

// DTO para actualizar el estado de un medicamento
const UpdateMedicamentoStatusDTO = Joi.object({
    status_medicamento: Joi.string().max(50).required(), // Estado del medicamento (obligatorio)
});

module.exports = {
    CreateMedicamentoDTO,
    UpdateMedicamentoStatusDTO,
};
