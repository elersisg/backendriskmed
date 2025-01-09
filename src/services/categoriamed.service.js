const categoriaMedModel = require('../models/categoriamed.model.js');

// Servicio para obtener todas las categorías médicas
const getAllCategorias = async () => {
    return await categoriaMedModel.selectCategorias();
};

module.exports = {
    getAllCategorias, // Exportar el método
};
