const Joi = require('joi');

// DTO para crear un nuevo factor
const CreateFactorDTO = Joi.object({
    id_tipofactor: Joi.number().integer().positive().required(), // FK a TipoFactor
    id_evaluacion: Joi.number().integer().positive().required(), // FK a Evaluacion
    categoriariesgo: Joi.string().max(255).required(), // Categoría de riesgo
    puntaje: Joi.string().max(50).required(), // Puntaje asignado
    valor: Joi.number().precision(2).positive().required(), // Valor calculado del factor
});

module.exports = {
    CreateFactorDTO,
};
