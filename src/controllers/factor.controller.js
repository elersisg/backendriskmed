const factorService = require('../services/factor.service');
const { CreateFactorDTO } = require('../DTO/factor.dto');

// Insertar un nuevo factor
const createFactor = async (req, res, next) => {
    try {
        const validatedData = await CreateFactorDTO.validateAsync(req.body);
        const nuevoFactor = await factorService.createFactor(validatedData);
        res.status(201).json({ message: 'Factor creado exitosamente', nuevoFactor });
    } catch (error) {
        next(error);
    }
};

// Obtener factores por evaluación
const getFactorsByEvaluacion = async (req, res, next) => {
    try {
        const { id_evaluacion } = req.params;
        const factores = await factorService.getFactorsByEvaluacion(id_evaluacion);
        res.status(200).json(factores);
    } catch (error) {
        next(error);
    }
};

// Eliminar un factor por ID
const deleteFactor = async (req, res, next) => {
    try {
        const { id_factor } = req.params;
        const result = await factorService.deleteFactor(id_factor);

        if (result > 0) {
            res.status(200).json({ message: `Factor con ID ${id_factor} eliminado exitosamente` });
        } else {
            res.status(404).json({ message: `Factor con ID ${id_factor} no encontrado` });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createFactor,
    getFactorsByEvaluacion,
    deleteFactor,
};
