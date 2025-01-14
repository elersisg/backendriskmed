const { connectToDatabase } = require('../config/dbConfig.js');

// Actualizar un nivel de riesgo
const updateNivelRiesgo = async (id_nivelriesgo, nombre_riesgo, puntuacion) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_nivelriesgo', id_nivelriesgo)
            .input('nombre_riesgo', nombre_riesgo)
            .input('puntuacion', puntuacion)
            .execute('UpdateNivelRiesgo');
        return result.recordset[0]; // Retorna los datos actualizados
    } catch (error) {
        console.error('Error en updateNivelRiesgo:', error.message);
        throw error;
    }
};

// Seleccionar niveles de riesgo con datos relacionados
const selectNivelRiesgoWithJoins = async () => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().execute('SelectNivelRiesgoWithJoins');
        return result.recordset; // Retorna los niveles de riesgo con sus relaciones
    } catch (error) {
        console.error('Error en selectNivelRiesgoWithJoins:', error.message);
        throw error;
    }
};

module.exports = {
    updateNivelRiesgo,
    selectNivelRiesgoWithJoins,
};