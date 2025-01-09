const inspectorService = require('../services/inspector.service.js');
const { CreateInspectorDTO, FilterInspectoresByNombreDTO } = require('../DTO/inspector.dto.js');

// Insertar un nuevo inspector
const createInspector = async (req, res, next) => {
    try {
        const validatedData = await CreateInspectorDTO.validateAsync(req.body);
        const nuevoInspector = await inspectorService.createInspector(validatedData);
        res.status(201).json({ message: 'Inspector creado exitosamente', nuevoInspector });
    } catch (error) {
        next(error);
    }
};

// Obtener lista de inspectores con filtro opcional por nombre
const getInspectoresByNombre = async (req, res, next) => {
    try {
        const { nombre } = req.query;
        const inspectores = await inspectorService.getInspectoresByNombre(nombre);
        res.status(200).json(inspectores);
    } catch (error) {
        next(error);
    }
};

// Obtener inspectores con evaluaciones recientes
const getInspectoresWithEvaluations = async (req, res, next) => {
    try {
        const inspectores = await inspectorService.getInspectoresWithEvaluations();
        res.status(200).json(inspectores);
    } catch (error) {
        next(error);
    }
};

// Eliminar un inspector
const deleteInspector = async (req, res, next) => {
    try {
        const { id_inspector } = req.params;
        const result = await inspectorService.deleteInspector(id_inspector);

        if (result > 0) {
            res.status(200).json({ message: `Inspector con ID ${id_inspector} eliminado exitosamente` });
        } else {
            res.status(404).json({ message: `Inspector con ID ${id_inspector} no encontrado` });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createInspector,
    getInspectoresByNombre,
    getInspectoresWithEvaluations,
    deleteInspector,
};
