const { connectToDatabase } = require('../config/dbConfig');

// Seleccionar todos los tipos de factores
const selectTipoFactor = async () => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request().execute('SelectTipoFactor');
        return result.recordset; // Devuelve los tipos de factores
    } catch (error) {
        console.error('Error en selectTipoFactor:', error.message);
        throw error;
    }
};

// Insertar un nuevo tipo de factor
const insertTipoFactor = async (nombre) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('nombre', nombre)
            .query(`
                INSERT INTO TipoFactor (nombre)
                VALUES (@nombre);
                SELECT SCOPE_IDENTITY() AS id_tipo_factor;
            `);
        return result.recordset[0];
    } catch (error) {
        console.error('Error en insertTipoFactor:', error.message);
        throw error;
    }
};

module.exports = {
    selectTipoFactor,
    insertTipoFactor,
};