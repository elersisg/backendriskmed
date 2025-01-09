const Joi = require('joi');

// DTO para validar el ID de una categoría médica
const GetSubcategoriasByCategoriaDTO = Joi.object({
    id_categoria_med: Joi.number().integer().positive().required(), // ID debe ser entero positivo y obligatorio
});

module.exports = {
    GetSubcategoriasByCategoriaDTO,
};
