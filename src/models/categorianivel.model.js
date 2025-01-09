const { poolPromise } = require('../config/dbConfig.js');

// Seleccionar todas las categorías de nivel
const selectCategoriaNivel = async () => {
    const pool = await poolPromise;
    const result = await pool.request().execute('SelectCategoriaNivel');
    return result.recordset; // Devuelve las categorías de nivel
};

// Insertar una nueva categoría de nivel
const insertCategoriaNivel = async (nivel_riesgo, frecuencia_inspeccion) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('nivel_riesgo', nivel_riesgo)
        .input('frecuencia_inspeccion', frecuencia_inspeccion)
        .query(`
            INSERT INTO Categoria_nivel (nivel_riesgo, frecuencia_inspeccion)
            VALUES (@nivel_riesgo, @frecuencia_inspeccion);
            SELECT SCOPE_IDENTITY() AS id_categoria_nivel;
        `);
    return result.recordset[0];
};

module.exports = {
    selectCategoriaNivel,
    insertCategoriaNivel,
};
