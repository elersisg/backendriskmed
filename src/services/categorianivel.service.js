const categoriaNivelModel = require('../models/categorianivel.model.js');

// Servicio para obtener todas las categorías de nivel
const getAllCategoriaNivel = async () => {
    return await categoriaNivelModel.selectCategoriaNivel();
};

// Servicio para insertar una nueva categoría de nivel
const createCategoriaNivel = async (data) => {
    const { nivel_riesgo, frecuencia_inspeccion } = data;
    return await categoriaNivelModel.insertCategoriaNivel(nivel_riesgo, frecuencia_inspeccion);
};

module.exports = {
    getAllCategoriaNivel,
    createCategoriaNivel,
};
