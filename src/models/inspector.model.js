const { connectToDatabase } = require('../config/dbConfig.js');

// Insertar un nuevo inspector
const insertInspector = async (id_usuario, cedula_inspector) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_usuario', id_usuario)
            .input('cedula_inspector', cedula_inspector)
            .execute('InsertInspector');
        return result.recordset[0];
    } catch (error) {
        console.error('Error en insertInspector:', error.message);
        throw error;
    }
};
// Obtener lista de inspectores con filtro por nombre
const selectInspectorsByName = async (nombre) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('nombre', nombre || null)
            .execute('SelectInspectoresByNombre');
        return result.recordset;
    } catch (error) {
        console.error('Error en selectInspectorsByName:', error.message);
        throw error;
    }
};

// Obtener inspectores con evaluaciones recientes
const selectInspectorsWithEvaluations = async () => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .execute('SelectInspectoresWithEvaluations');
        return result.recordset;
    } catch (error) {
        console.error('Error en selectInspectorsWithEvaluations:', error.message);
        throw error;
    }
};

// Obtener inspectores sin evaluaciones en una fecha específica
const selectInspectorsWithoutEvaluationOnDate = async (fecha) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('fecha', fecha)
            .execute('SelectInspectoresSinEvaluacionEnFecha');
        return result.recordset;
    } catch (error) {
        console.error('Error en selectInspectorsWithoutEvaluationOnDate:', error.message);
        throw error;
    }
};

module.exports = {
    insertInspector,
    selectInspectorsByName,
    selectInspectorsWithEvaluations,
    selectInspectorsWithoutEvaluationOnDate,
};
