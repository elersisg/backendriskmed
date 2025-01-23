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

// Endpoint para calcular y guardar el riesgo del establecimiento
const calculateRisk = async (req, res, next) => {
    try {
        const { nivelRiesgoAlimento, scores, id_evaluacion } = req.body;

        // Validaciones iniciales
        if (
            typeof nivelRiesgoAlimento !== 'number' ||
            nivelRiesgoAlimento < 1 ||
            nivelRiesgoAlimento > 3
        ) {
            return res.status(400).json({
                error: 'El nivel de riesgo del alimento debe ser un número entre 1 (Bajo) y 3 (Alto).',
            });
        }

        if (!scores || scores.length !== 6) {
            return res.status(400).json({
                error: 'El array de puntuaciones debe contener exactamente 6 valores.',
            });
        }

        if (scores.some((score) => typeof score !== 'number' || score < 0)) {
            return res.status(400).json({
                error: 'Las puntuaciones deben ser números válidos mayores o iguales a 0.',
            });
        }

        if (!id_evaluacion) {
            return res.status(400).json({
                error: 'Se requiere un ID de evaluación válido.',
            });
        }

        // Llamar al servicio para calcular y guardar el riesgo
        const result = await evaluacionService.calculateAndSaveRisk(nivelRiesgoAlimento, scores, id_evaluacion);

        res.status(200).json({
            message: 'Cálculo realizado y guardado exitosamente',
            data: result,
        });
    } catch (error) {
        console.error('Error en calculateRisk:', error.message);
        next(error);
    }
};


module.exports = {
    createEvaluacion,
    getEvaluacionesWithFilters,
    updateEvaluacion,
    deleteEvaluacion,
    calculateRisk,
};
