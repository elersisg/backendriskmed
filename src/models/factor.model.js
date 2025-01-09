const { poolPromise } = require('../config/dbConfig');

// Insertar un nuevo factor
const insertFactor = async (data) => {
    const pool = await poolPromise;
    const { id_tipofactor, id_evaluacion, categoriariesgo, puntaje, valor } = data;
    const result = await pool.request()
        .input('id_tipofactor', id_tipofactor)
        .input('id_evaluacion', id_evaluacion)
        .input('categoriariesgo', categoriariesgo)
        .input('puntaje', puntaje)
        .input('valor', valor)
        .execute('InsertFactor');
    return result.recordset[0];
};

// Seleccionar factores por evaluación
const selectFactorsByEvaluacion = async (id_evaluacion) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_evaluacion', id_evaluacion)
        .execute('SelectFactorByEvaluacion');
    return result.recordset;
};

// Eliminar un factor por ID
const deleteFactorById = async (id_factor) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_factor', id_factor)
        .query(`
            DELETE FROM Factor
            WHERE id_factor = @id_factor;
        `);
    return result.rowsAffected[0]; // Retorna el número de filas afectadas
};

module.exports = {
    insertFactor,
    selectFactorsByEvaluacion,
    deleteFactorById,
};
