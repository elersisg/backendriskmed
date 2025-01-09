const tipoFactorService = require('../services/tipofactor.service.js');
const { CreateTipoFactorDTO } = require('../DTO/tipofactor.dto.js');

// Obtener todos los tipos de factores
const getAllTipoFactor = async (req, res, next) => {
    try {
        const tiposFactor = await tipoFactorService.getAllTipoFactor();
        res.status(200).json(tiposFactor);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo tipo de factor
const createTipoFactor = async (req, res, next) => {
    try {
        const validatedData = await CreateTipoFactorDTO.validateAsync(req.body);
        const nuevoTipoFactor = await tipoFactorService.createTipoFactor(validatedData);
        res.status(201).json({ message: 'Tipo de factor creado exitosamente', nuevoTipoFactor });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTipoFactor,
    createTipoFactor,
};
