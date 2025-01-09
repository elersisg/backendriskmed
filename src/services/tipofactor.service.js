const tipoFactorModel = require('../models/tipofactor.model.js');

// Servicio para obtener todos los tipos de factores
const getAllTipoFactor = async () => {
    return await tipoFactorModel.selectTipoFactor();
};

// Servicio para insertar un nuevo tipo de factor
const createTipoFactor = async (data) => {
    const { nombre } = data;
    return await tipoFactorModel.insertTipoFactor(nombre);
};

module.exports = {
    getAllTipoFactor,
    createTipoFactor,
};
