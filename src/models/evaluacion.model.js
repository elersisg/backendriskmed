const { poolPromise } = require('../config/dbConfig');

// Insertar una nueva evaluación
const insertEvaluacion = async (data) => {
    const pool = await poolPromise;
    const {
        id_proveedor,
        id_categoria_nivel,
        id_inspector,
        riesgo_establecimiento,
        resultado,
        observacion,
        fecha,
        status_evaluacion,
    } = data;
    const result = await pool.request()
        .input('id_proveedor', id_proveedor)
        .input('id_categoria_nivel', id_categoria_nivel)
        .input('id_inspector', id_inspector)
        .input('riesgo_establecimiento', riesgo_establecimiento)
        .input('resultado', resultado)
        .input('observacion', observacion)
        .input('fecha', fecha)
        .input('status_evaluacion', status_evaluacion)
        .execute('InsertEvaluacion');
    return result.recordset[0];
};

// Obtener evaluaciones con filtros
const selectEvaluacionWithFilters = async (filters) => {
    const { id_proveedor, id_inspector, fecha_inicio, fecha_fin } = filters;
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_proveedor', id_proveedor || null)
        .input('id_inspector', id_inspector || null)
        .input('fecha_inicio', fecha_inicio || null)
        .input('fecha_fin', fecha_fin || null)
        .execute('SelectEvaluacionWithFilters');
    return result.recordset;
};

// Actualizar una evaluación
const updateEvaluacion = async (id_evaluacion, data) => {
    const pool = await poolPromise;
    const { id_categoria_nivel, riesgo_establecimiento, resultado, observacion, status_evaluacion } = data;
    const result = await pool.request()
        .input('id_evaluacion', id_evaluacion)
        .input('id_categoria_nivel', id_categoria_nivel)
        .input('riesgo_establecimiento', riesgo_establecimiento)
        .input('resultado', resultado)
        .input('observacion', observacion)
        .input('status_evaluacion', status_evaluacion)
        .execute('UpdateEvaluacion');
    return result.recordset[0];
};

// Eliminar una evaluación por ID
const deleteEvaluacionById = async (id_evaluacion) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_evaluacion', id_evaluacion)
        .query(`
            DELETE FROM Evaluacion
            WHERE id_evaluacion = @id_evaluacion;
        `);
    return result.rowsAffected[0]; // Retorna el número de filas afectadas
};

module.exports = {
    insertEvaluacion,
    selectEvaluacionWithFilters,
    updateEvaluacion,
    deleteEvaluacionById,
};
