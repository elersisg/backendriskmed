const categoriaMedService = require('../services/categoriamed.service.js');

// Obtener todas las categorías
const getAllCategorias = async (req, res, next) => {
    try {
        const categorias = await categoriaMedService.getAllCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        next(error); // Manejo de errores
    }
};

module.exports = {
    getAllCategorias,
};
