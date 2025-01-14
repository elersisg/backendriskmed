const { connectToDatabase } = require('../config/dbConfig.js');

// Seleccionar todas las categorías de nivel
const selectCategoriaNivel = async () => {
    try {
        const pool = await connectToDatabase(); // Conectar a la base de datos
        const result = await pool.request().execute('SelectCategoriaNivel');
        return result.recordset; // Devuelve las categorías de nivel
    } catch (error) {
        console.error('Error en selectCategoriaNivel:', error.message);
        throw error; // Propaga el error para manejo superior
    }
};

// Insertar una nueva categoría de nivel
const insertCategoriaNivel = async (nivel_riesgo, frecuencia_inspeccion) => {
    try {
        const pool = await connectToDatabase(); // Conectar a la base de datos
        const result = await pool.request()
            .input('nivel_riesgo', nivel_riesgo)
            .input('frecuencia_inspeccion', frecuencia_inspeccion)
            .query(`
                INSERT INTO Categoria_nivel (nivel_riesgo, frecuencia_inspeccion)
                VALUES (@nivel_riesgo, @frecuencia_inspeccion);
                SELECT SCOPE_IDENTITY() AS id_categoria_nivel;
            `);
        return result.recordset[0];
    } catch (error) {
        console.error('Error en insertCategoriaNivel:', error.message);
        throw error; // Propaga el error para manejo superior
    }
};

module.exports = {
    selectCategoriaNivel,
    insertCategoriaNivel,
};