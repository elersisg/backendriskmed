const Joi = require('joi');

// DTO para crear una nueva categoría de nivel
const CreateCategoriaNivelDTO = Joi.object({
    nivel_riesgo: Joi.string().max(50).required(), // Nivel de riesgo (obligatorio)
    frecuencia_inspeccion: Joi.string().max(50).required(), // Frecuencia de inspección (obligatorio)
});

// DTO para validar el ID de una categoría de nivel
const GetCategoriaNivelByIdDTO = Joi.object({
    id_categoria_nivel: Joi.number().integer().positive().required(), // ID de la categoría de nivel (obligatorio)
});

module.exports = {
    CreateCategoriaNivelDTO,
    GetCategoriaNivelByIdDTO,
};
