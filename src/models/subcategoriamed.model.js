const { poolPromise } = require('../config/dbConfig');

// Seleccionar subcategorías por categoría médica
const selectSubcategoriasByCategoria = async (id_categoria_med) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_categoria_med', id_categoria_med)
        .execute('SelectSubcategoriaByCategoria');
    return result.recordset; // Retorna las subcategorías relacionadas
};

module.exports = {
    selectSubcategoriasByCategoria,
};
