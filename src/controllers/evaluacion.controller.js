const evaluacionService = require('../services/evaluacion.service');
const { CreateEvaluacionDTO, UpdateEvaluacionDTO } = require('../DTO/evaluacion.dto');

// Insertar una nueva evaluación
const createEvaluacion = async (req, res, next) => {
    try {
        const validatedData = await CreateEvaluacionDTO.validateAsync(req.body);
        const nuevaEvaluacion = await evaluacionService.createEvaluacion(validatedData);
        res.status(201).json({ message: 'Evaluación creada exitosamente', nuevaEvaluacion });
    } catch (error) {
        next(error);
    }
};

// Obtener evaluaciones con filtros
const getEvaluacionesWithFilters = async (req, res, next) => {
    try {
        const evaluaciones = await evaluacionService.getEvaluacionesWithFilters(req.query);
        res.status(200).json(evaluaciones);
    } catch (error) {
        next(error);
    }
};

// Actualizar una evaluación
const updateEvaluacion = async (req, res, next) => {
    try {
        const { id_evaluacion } = req.params;
        const validatedData = await UpdateEvaluacionDTO.validateAsync(req.body);
        const evaluacionActualizada = await evaluacionService.updateEvaluacion(id_evaluacion, validatedData);
        res.status(200).json({ message: 'Evaluación actualizada exitosamente', evaluacionActualizada });
    } catch (error) {
        next(error);
    }
};

// Eliminar una evaluación por ID
const deleteEvaluacion = async (req, res, next) => {
    try {
        const { id_evaluacion } = req.params;
        const result = await evaluacionService.deleteEvaluacion(id_evaluacion);

        if (result > 0) {
            res.status(200).json({ message: `Evaluación con ID ${id_evaluacion} eliminada exitosamente` });
        } else {
            res.status(404).json({ message: `Evaluación con ID ${id_evaluacion} no encontrada` });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createEvaluacion,
    getEvaluacionesWithFilters,
    updateEvaluacion,
    deleteEvaluacion,
};
