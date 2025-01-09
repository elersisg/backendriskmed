const factorModel = require('../models/factor.model');

// Servicio para insertar un factor
const createFactor = async (data) => {
    return await factorModel.insertFactor(data);
};

// Servicio para obtener factores por evaluación
const getFactorsByEvaluacion = async (id_evaluacion) => {
    return await factorModel.selectFactorsByEvaluacion(id_evaluacion);
};

// Servicio para eliminar un factor
const deleteFactor = async (id_factor) => {
    return await factorModel.deleteFactorById(id_factor);
};

module.exports = {
    createFactor,
    getFactorsByEvaluacion,
    deleteFactor,
};
