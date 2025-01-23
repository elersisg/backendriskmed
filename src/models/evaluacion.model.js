const { connectToDatabase } = require('../config/dbConfig');

// Insertar una nueva evaluación
const insertEvaluacion = async (data) => {
    try {
        const pool = await connectToDatabase();
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
    } catch (error) {
        console.error('Error en insertEvaluacion:', error.message);
        throw error;
    }
};

// Obtener evaluaciones con filtros
const selectEvaluacionWithFilters = async (filters) => {
    try {
        const { id_proveedor, id_inspector, fecha_inicio, fecha_fin } = filters;
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_proveedor', id_proveedor || null)
            .input('id_inspector', id_inspector || null)
            .input('fecha_inicio', fecha_inicio || null)
            .input('fecha_fin', fecha_fin || null)
            .execute('SelectEvaluacionWithFilters');
        return result.recordset;
    } catch (error) {
        console.error('Error en selectEvaluacionWithFilters:', error.message);
        throw error;
    }
};

// Actualizar una evaluación
const updateEvaluacion = async (id_evaluacion, data) => {
    try {
        const pool = await connectToDatabase();
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
    } catch (error) {
        console.error('Error en updateEvaluacion:', error.message);
        throw error;
    }
};

// Eliminar una evaluación por ID
const deleteEvaluacionById = async (id_evaluacion) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_evaluacion', id_evaluacion)
            .query(`
                DELETE FROM Evaluacion
                WHERE id_evaluacion = @id_evaluacion;
            `);
        return result.rowsAffected[0]; // Retorna el número de filas afectadas
    } catch (error) {
        console.error('Error en deleteEvaluacionById:', error.message);
        throw error;
    }
};


// Actualizar los cálculos de riesgo en la evaluación
const updateEvaluacionRisk = async (id_evaluacion, riesgoEstablecimiento, riesgoTotal) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_evaluacion', id_evaluacion)
            .input('riesgo_establecimiento', riesgoEstablecimiento)
            .input('resultado', riesgoTotal)
            .query(`
                UPDATE Evaluacion
                SET riesgo_establecimiento = @riesgo_establecimiento,
                    resultado = @resultado
                WHERE id_evaluacion = @id_evaluacion;
            `);

        return result.rowsAffected[0]; // Retorna el número de filas afectadas
    } catch (error) {
        console.error('Error en updateEvaluacionRisk:', error.message);
        throw error;
    }
};

module.exports = {
    updateEvaluacionRisk,
};

module.exports = {
    insertEvaluacion,
    selectEvaluacionWithFilters,
    updateEvaluacion,
    deleteEvaluacionById,
    updateEvaluacionRisk,
};