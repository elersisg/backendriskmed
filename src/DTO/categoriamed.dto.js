const Joi = require('joi');

// DTO para validar el ID de una categoría
const GetCategoriaByIdDTO = Joi.object({
    id_categoria_med: Joi.number().integer().positive().required(), // ID debe ser un número entero positivo y es obligatorio
});

// DTO para crear o actualizar una categoría
const CreateOrUpdateCategoriaDTO = Joi.object({
    nombre_categoria: Joi.string().max(100).required(), // Nombre de la categoría es obligatorio y máximo de 100 caracteres
});

module.exports = {
    GetCategoriaByIdDTO,
    CreateOrUpdateCategoriaDTO,
};
