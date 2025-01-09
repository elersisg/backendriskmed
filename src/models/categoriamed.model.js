const { poolPromise } = require('../config/dbConfig.js');

// Seleccionar todas las categorías
const selectCategorias = async () => {
    const pool = await poolPromise;
    const result = await pool.request().execute('SelectCategoria');
    return result.recordset; // Retorna todas las categorías
};

module.exports = {
    selectCategorias, // Exportar el método
};