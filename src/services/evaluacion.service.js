const evaluacionModel = require('../models/evaluacion.model');

// Servicio para insertar una evaluación
const createEvaluacion = async (data) => {
    return await evaluacionModel.insertEvaluacion(data);
};

// Servicio para obtener evaluaciones con filtros
const getEvaluacionesWithFilters = async (filters) => {
    return await evaluacionModel.selectEvaluacionWithFilters(filters);
};

// Servicio para actualizar una evaluación
const updateEvaluacion = async (id_evaluacion, data) => {
    return await evaluacionModel.updateEvaluacion(id_evaluacion, data);
};

// Servicio para eliminar una evaluación
const deleteEvaluacion = async (id_evaluacion) => {
    return await evaluacionModel.deleteEvaluacionById(id_evaluacion);
};

module.exports = {
    createEvaluacion,
    getEvaluacionesWithFilters,
    updateEvaluacion,
    deleteEvaluacion,
};
