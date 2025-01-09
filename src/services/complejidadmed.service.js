const complejidadMedModel = require('../models/complejidadmed.model.js');

// Servicio para obtener todas las complejidades
const getAllComplejidades = async () => {
    return await complejidadMedModel.selectComplejidades();
};

// Servicio para insertar una nueva complejidad
const createComplejidad = async (data) => {
    const { nombre_complejidad } = data;
    return await complejidadMedModel.insertComplejidad(nombre_complejidad);
};

module.exports = {
    getAllComplejidades,
    createComplejidad,
};
