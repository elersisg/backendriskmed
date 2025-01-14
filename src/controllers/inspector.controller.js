const inspectorService = require('../services/inspector.service');

// Crear un nuevo inspector
const createInspector = async (req, res, next) => {
    try {
        const { id_usuario, cedula_inspector } = req.body;
        const inspector = await inspectorService.createInspector(id_usuario, cedula_inspector);
        res.status(201).json({ message: 'Inspector creado exitosamente', inspector });
    } catch (error) {
        next(error);
    }
};

// Obtener lista de inspectores con filtro opcional por nombre
const getInspectoresByNombre = async (req, res, next) => {
    try {
        const { nombre } = req.query;
        const inspectores = await inspectorService.getInspectoresByNombre(nombre);
        res.status(200).json({ inspectores });
    } catch (error) {
        next(error);
    }
};

// Obtener inspectores con evaluaciones recientes
const getInspectoresWithEvaluations = async (req, res, next) => {
    try {
        const inspectores = await inspectorService.getInspectoresWithEvaluations();
        res.status(200).json({ inspectores });
    } catch (error) {
        next(error);
    }
};

// Obtener inspectores sin evaluación en una fecha específica
const getInspectoresWithoutEvaluationOnDate = async (req, res, next) => {
    try {
        const { fecha } = req.body;
        const inspectores = await inspectorService.getInspectoresWithoutEvaluationOnDate(fecha);
        res.status(200).json({ inspectores });
    } catch (error) {
        next(error);
    }
};

// Eliminar un inspector
const deleteInspector = async (req, res, next) => {
    try {
        const { id_inspector } = req.params;
        await inspectorService.deleteInspector(id_inspector);
        res.status(200).json({ message: 'Inspector eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createInspector,
    getInspectoresByNombre,
    getInspectoresWithEvaluations,
    getInspectoresWithoutEvaluationOnDate,
    deleteInspector,
};
