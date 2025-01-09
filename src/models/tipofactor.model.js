const { poolPromise } = require('../config/dbConfig.js');

// Seleccionar todos los tipos de factores
const selectTipoFactor = async () => {
    const pool = await poolPromise;
    const result = await pool.request().execute('SelectTipoFactor');
    return result.recordset; // Devuelve los tipos de factores
};

// Insertar un nuevo tipo de factor
const insertTipoFactor = async (nombre) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('nombre', nombre)
        .query(`
            INSERT INTO TipoFactor (nombre)
            VALUES (@nombre);
            SELECT SCOPE_IDENTITY() AS id_tipo_factor;
        `);
    return result.recordset[0];
};

module.exports = {
    selectTipoFactor,
    insertTipoFactor,
};
