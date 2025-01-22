const inspectorService = require('../services/inspector.service');
const { CreateInspectorDTO, InspectorsWithoutEvaluationDTO } = require('../DTO/inspector.dto');

const createInspector = async (req, res, next) => {
    try {
        const validatedData = await CreateInspectorDTO.validateAsync(req.body); // Validar datos de entrada
        const inspector = await inspectorService.createInspector(validatedData);
        res.status(201).json({ message: 'Inspector creado exitosamente', inspector });
    } catch (error) {
        console.error('Error en createInspector:', error.message);
        next(error);
    }
};

const getInspectoresByNombre = async (req, res, next) => {
    try {
        const { nombre } = req.query;
        const inspectores = await inspectorService.getInspectorsByName(nombre);
        res.status(200).json(inspectores);
    } catch (error) {
        console.error('Error en getInspectoresByNombre:', error.message);
        next(error);
    }
};

const getInspectoresWithEvaluations = async (req, res, next) => {
    try {
        const inspectores = await inspectorService.getInspectorsWithEvaluations();
        res.status(200).json(inspectores);
    } catch (error) {
        console.error('Error en getInspectoresWithEvaluations:', error.message);
        next(error);
    }
};

const getInspectoresWithoutEvaluationOnDate = async (req, res, next) => {
    try {
        const validatedData = await InspectorsWithoutEvaluationDTO.validateAsync(req.query); // Validar fecha
        const inspectores = await inspectorService.getInspectorsWithoutEvaluationOnDate(validatedData.fecha);
        res.status(200).json(inspectores);
    } catch (error) {
        console.error('Error en getInspectoresWithoutEvaluationOnDate:', error.message);
        next(error);
    }
};

const deleteInspector = async (req, res, next) => {
    try {
        const { id_inspector } = req.params;
        const deleted = await inspectorService.deleteInspector(id_inspector);
        if (deleted) {
            res.status(200).json({ message: 'Inspector eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Inspector no encontrado' });
        }
    } catch (error) {
        console.error('Error en deleteInspector:', error.message);
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