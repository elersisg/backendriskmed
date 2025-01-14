const { connectToDatabase } = require('../config/dbConfig.js');

// Seleccionar todas las categorías
const selectCategorias = async () => {
    try {
        const pool = await connectToDatabase(); // Conectar a la base de datos
        const result = await pool.request().execute('SelectCategoria');
        return result.recordset; // Retorna todas las categorías
    } catch (error) {
        console.error('Error en selectCategorias:', error.message);
        throw error; // Propaga el error para que sea manejado en el nivel superior
    }
};

module.exports = {
    selectCategorias, // Exportar el método
};