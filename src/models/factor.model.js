const { connectToDatabase } = require('../config/dbConfig');

// Insertar un nuevo factor
const insertFactor = async (data) => {
    try {
        const pool = await connectToDatabase();
        const { id_tipofactor, id_evaluacion, categoriariesgo, puntaje, valor } = data;
        const result = await pool.request()
            .input('id_tipofactor', id_tipofactor)
            .input('id_evaluacion', id_evaluacion)
            .input('categoriariesgo', categoriariesgo)
            .input('puntaje', puntaje)
            .input('valor', valor)
            .execute('InsertFactor');
        return result.recordset[0];
    } catch (error) {
        console.error('Error en insertFactor:', error.message);
        throw error;
    }
};

// Seleccionar factores por evaluación
const selectFactorsByEvaluacion = async (id_evaluacion) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_evaluacion', id_evaluacion)
            .execute('SelectFactorByEvaluacion');
        return result.recordset;
    } catch (error) {
        console.error('Error en selectFactorsByEvaluacion:', error.message);
        throw error;
    }
};

// Eliminar un factor por ID
const deleteFactorById = async (id_factor) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_factor', id_factor)
            .query(`
                DELETE FROM Factor
                WHERE id_factor = @id_factor;
            `);
        return result.rowsAffected[0]; // Retorna el número de filas afectadas
    } catch (error) {
        console.error('Error en deleteFactorById:', error.message);
        throw error;
    }
};

module.exports = {
    insertFactor,
    selectFactorsByEvaluacion,
    deleteFactorById,
};