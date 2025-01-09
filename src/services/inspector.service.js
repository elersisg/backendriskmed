const inspectorModel = require('../models/inspector.model.js');

// Servicio para insertar un inspector
const createInspector = async (data) => {
    return await inspectorModel.insertInspector(data);
};

// Servicio para obtener inspectores por nombre
const getInspectoresByNombre = async (nombre) => {
    return await inspectorModel.selectInspectoresByNombre(nombre);
};

// Servicio para obtener inspectores con evaluaciones recientes
const getInspectoresWithEvaluations = async () => {
    return await inspectorModel.selectInspectoresWithEvaluations();
};

// Servicio para eliminar un inspector
const deleteInspector = async (id_inspector) => {
    return await inspectorModel.deleteInspectorById(id_inspector);
};

module.exports = {
    createInspector,
    getInspectoresByNombre,
    getInspectoresWithEvaluations,
    deleteInspector,
};
