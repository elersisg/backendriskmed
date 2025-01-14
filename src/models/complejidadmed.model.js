const { connectToDatabase } = require('../config/dbConfig.js');

// Seleccionar todas las complejidades
const selectComplejidades = async () => {
    try {
        const pool = await connectToDatabase(); // Conectar a la base de datos
        const result = await pool.request().execute('SelectComplejidad');
        return result.recordset; // Devuelve las complejidades
    } catch (error) {
        console.error('Error en selectComplejidades:', error.message);
        throw error; // Propaga el error para manejo superior
    }
};

// Insertar una nueva complejidad
const insertComplejidad = async (nombre_complejidad) => {
    try {
        const pool = await connectToDatabase(); // Conectar a la base de datos
        const result = await pool.request()
            .input('nombre_complejidad', nombre_complejidad)
            .query(`
                INSERT INTO Complejidad_med (nombre_complejidad)
                VALUES (@nombre_complejidad);
                SELECT SCOPE_IDENTITY() AS id_complejidad;
            `);
        return result.recordset[0];
    } catch (error) {
        console.error('Error en insertComplejidad:', error.message);
        throw error; // Propaga el error para manejo superior
    }
};

module.exports = {
    selectComplejidades,
    insertComplejidad,
};