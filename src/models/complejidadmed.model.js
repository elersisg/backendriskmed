const { poolPromise } = require('../config/dbConfig.js');

// Seleccionar todas las complejidades
const selectComplejidades = async () => {
    const pool = await poolPromise;
    const result = await pool.request().execute('SelectComplejidad');
    return result.recordset; // Devuelve las complejidades
};

// Insertar una nueva complejidad
const insertComplejidad = async (nombre_complejidad) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('nombre_complejidad', nombre_complejidad)
        .query(`
            INSERT INTO Complejidad_med (nombre_complejidad)
            VALUES (@nombre_complejidad);
            SELECT SCOPE_IDENTITY() AS id_complejidad;
        `);
    return result.recordset[0];
};

module.exports = {
    selectComplejidades,
    insertComplejidad,
};
