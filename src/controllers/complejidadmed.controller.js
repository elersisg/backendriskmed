const complejidadMedService = require('../services/complejidadmed.service');
const { CreateComplejidadDTO } = require('../DTO/complejidadmed.dto.js');

// Obtener todas las complejidades
const getAllComplejidades = async (req, res, next) => {
    try {
        const complejidades = await complejidadMedService.getAllComplejidades();
        res.status(200).json(complejidades);
    } catch (error) {
        next(error);
    }
};

// Crear una nueva complejidad
const createComplejidad = async (req, res, next) => {
    try {
        const validatedData = await CreateComplejidadDTO.validateAsync(req.body);
        const nuevaComplejidad = await complejidadMedService.createComplejidad(validatedData);
        res.status(201).json({ message: 'Complejidad creada exitosamente', nuevaComplejidad });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllComplejidades,
    createComplejidad,
};
