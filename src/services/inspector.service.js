const inspectorModel = require('../models/inspector.model.js');

// Crear inspector
const createInspector = async (data) => {
    const { id_usuario, cedula_inspector } = data;
    return await inspectorModel.insertInspector(id_usuario, cedula_inspector);
};

// Obtener lista de inspectores con filtro por nombre
const getInspectorsByName = async (nombre) => {
    return await inspectorModel.selectInspectorsByName(nombre);
};

// Obtener inspectores con evaluaciones recientes
const getInspectorsWithEvaluations = async () => {
    return await inspectorModel.selectInspectorsWithEvaluations();
};

// Obtener inspectores sin evaluación en una fecha específica
const getInspectorsWithoutEvaluationOnDate = async (fecha) => {
    return await inspectorModel.selectInspectorsWithoutEvaluationOnDate(fecha);
};

module.exports = {
    createInspector,
    getInspectorsByName,
    getInspectorsWithEvaluations,
    getInspectorsWithoutEvaluationOnDate,
};
