const { poolPromise } = require('../config/dbConfig.js');

// Actualizar un nivel de riesgo
const updateNivelRiesgo = async (id_nivelriesgo, nombre_riesgo, puntuacion) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_nivelriesgo', id_nivelriesgo)
        .input('nombre_riesgo', nombre_riesgo)
        .input('puntuacion', puntuacion)
        .execute('UpdateNivelRiesgo');
    return result.recordset[0]; // Retorna los datos actualizados
};

// Seleccionar niveles de riesgo con datos relacionados
const selectNivelRiesgoWithJoins = async () => {
    const pool = await poolPromise;
    const result = await pool.request().execute('SelectNivelRiesgoWithJoins');
    return result.recordset; // Retorna los niveles de riesgo con sus relaciones
};

module.exports = {
    updateNivelRiesgo,
    selectNivelRiesgoWithJoins,
};
