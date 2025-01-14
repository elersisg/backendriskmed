const nivelRiesgoModel = require('../models/nivelriesgo.model.js');

// Servicio para actualizar nivel de riesgo
const updateNivelRiesgo = async (id_nivelriesgo, data) => {
    const { nombre_riesgo, puntuacion } = data;
    return await nivelRiesgoModel.updateNivelRiesgo(id_nivelriesgo, nombre_riesgo, puntuacion);
};

// Servicio para obtener niveles de riesgo con joins
const getNivelRiesgoWithJoins = async () => {
    return await nivelRiesgoModel.selectNivelRiesgoWithJoins();
};

module.exports = {
    updateNivelRiesgo,
    getNivelRiesgoWithJoins,
};