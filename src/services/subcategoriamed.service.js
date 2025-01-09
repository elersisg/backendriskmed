const subcategoriaMedModel = require('../models/subcategoriamed.model.js');

// Servicio para obtener subcategorías por categoría médica
const getSubcategoriasByCategoria = async (id_categoria_med) => {
    return await subcategoriaMedModel.selectSubcategoriasByCategoria(id_categoria_med);
};

module.exports = {
    getSubcategoriasByCategoria,
};
