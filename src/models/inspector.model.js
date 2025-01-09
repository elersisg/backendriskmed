const { poolPromise } = require('../config/dbConfig.js');

// Insertar un nuevo inspector
const insertInspector = async (data) => {
    const pool = await poolPromise;
    const { id_usuario, cedula_inspector } = data;
    const result = await pool.request()
        .input('id_usuario', id_usuario)
        .input('cedula_inspector', cedula_inspector)
        .execute('InsertInspector');
    return result.recordset[0];
};

// Obtener lista de inspectores con filtro opcional por nombre
const selectInspectoresByNombre = async (nombre) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('nombre', nombre || null)
        .execute('SelectInspectoresByNombre');
    return result.recordset;
};

// Obtener inspectores con evaluaciones recientes
const selectInspectoresWithEvaluations = async () => {
    const pool = await poolPromise;
    const result = await pool.request().execute('SelectInspectoresWithEvaluations');
    return result.recordset;
};

// Eliminar un inspector por ID
const deleteInspectorById = async (id_inspector) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_inspector', id_inspector)
        .query(`
            DELETE FROM Inspector
            WHERE id_inspector = @id_inspector;
        `);
    return result.rowsAffected[0]; // Retorna el número de filas afectadas
};

module.exports = {
    insertInspector,
    selectInspectoresByNombre,
    selectInspectoresWithEvaluations,
    deleteInspectorById,
};
