const subcategoriaMedService = require('../services/subcategoriamed.service');
const { GetSubcategoriasByCategoriaDTO } = require('../DTO/subcategoriamed.dto.js');

// Obtener subcategorías por categoría médica
const getSubcategoriasByCategoria = async (req, res, next) => {
    try {
        const { id_categoria_med } = req.params; // ID desde los parámetros de la URL
        const validatedData = await GetSubcategoriasByCategoriaDTO.validateAsync({ id_categoria_med });
        const subcategorias = await subcategoriaMedService.getSubcategoriasByCategoria(validatedData.id_categoria_med);
        res.status(200).json(subcategorias);
    } catch (error) {
        next(error); // Manejo de errores
    }
};

module.exports = {
    getSubcategoriasByCategoria,
};
