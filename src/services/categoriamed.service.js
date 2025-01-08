const categoriaMedModel = require('../models/categoriamed.model.js');

// Servicio para seleccionar todas las categorías
const getAllCategorias = async () => {
    return await categoriaMedModel.selectCategorias();
};

module.exports = {
    getAllCategorias,
};
