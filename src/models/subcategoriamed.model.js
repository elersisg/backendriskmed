const { connectToDatabase } = require('../config/dbConfig');

// Seleccionar subcategorías por categoría médica
const selectSubcategoriasByCategoria = async (id_categoria_med) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_categoria_med', id_categoria_med)
            .execute('SelectSubcategoriaByCategoria');
        return result.recordset; // Retorna las subcategorías relacionadas
    } catch (error) {
        console.error('Error en selectSubcategoriasByCategoria:', error.message);
        throw error;
    }
};

module.exports = {
    selectSubcategoriasByCategoria,
};