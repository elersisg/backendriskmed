const { CreateOrUpdateCategoriaDTO } = require('../DTO/categoriamed.dto.js');
const categoriaMedService = require('../services/categoriamed.service.js');

// Crear una nueva categoría médica
const getAllCategorias = async (req, res, next) => {
    try {
        const categorias = await categoriaMedService.getAllCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        next(error); // Manejo de errores
    }
};

module.exports = {
    getAllCategorias, // Exportar el método
};
