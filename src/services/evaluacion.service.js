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

// Servicio para calcular y guardar el riesgo
const calculateAndSaveRisk = async (nivelRiesgoAlimento, scores, id_evaluacion) => {
    // Pesos para cada factor de riesgo
    const weights = [0.16, 0.09, 0.56, 0.05, 0.06, 0.08];

    // Cálculo del Riesgo del Establecimiento
    const riesgoEstablecimiento = scores.reduce(
        (total, score, index) => total + score * weights[index],
        0
    );

    // Cálculo del Riesgo Total (Riesgo Alimento x Riesgo Establecimiento)
    const riesgoTotal = nivelRiesgoAlimento * riesgoEstablecimiento;

    // Guardar los cálculos en la base de datos
    const result = await evaluacionModel.updateEvaluacionRisk(id_evaluacion, riesgoEstablecimiento, riesgoTotal);

    return {
        id_evaluacion,
        nivel_riesgo_alimento: nivelRiesgoAlimento,
        riesgo_establecimiento: riesgoEstablecimiento.toFixed(2),
        riesgo_total: riesgoTotal.toFixed(2),
        result,
    };
};

module.exports = {
    createEvaluacion,
    getEvaluacionesWithFilters,
    updateEvaluacion,
    deleteEvaluacion,
    calculateAndSaveRisk,
};
