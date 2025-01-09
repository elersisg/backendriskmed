const categoriaNivelService = require('../services/categorianivel.service');
const { CreateCategoriaNivelDTO } = require('../DTO/categorianivel.dto.js');

// Obtener todas las categorías de nivel
const getAllCategoriaNivel = async (req, res, next) => {
    try {
        const categoriasNivel = await categoriaNivelService.getAllCategoriaNivel();
        res.status(200).json(categoriasNivel);
    } catch (error) {
        next(error);
    }
};

// Crear una nueva categoría de nivel
const createCategoriaNivel = async (req, res, next) => {
    try {
        const validatedData = await CreateCategoriaNivelDTO.validateAsync(req.body);
        const nuevaCategoriaNivel = await categoriaNivelService.createCategoriaNivel(validatedData);
        res.status(201).json({ message: 'Categoría de nivel creada exitosamente', nuevaCategoriaNivel });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCategoriaNivel,
    createCategoriaNivel,
};
