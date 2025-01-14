const { connectToDatabase } = require('../config/dbConfig');

// Insertar una nueva solicitud
const insertSolicitud = async (data) => {
    try {
        const pool = await connectToDatabase();
        const { id_subcategoria, id_medicamento, id_proveedor, metodo_produccion, cantidad_med, status_solicitud, comentario } = data;
        const result = await pool.request()
            .input('id_subcategoria', id_subcategoria)
            .input('id_medicamento', id_medicamento)
            .input('id_proveedor', id_proveedor)
            .input('metodo_produccion', metodo_produccion)
            .input('cantidad_med', cantidad_med)
            .input('status_solicitud', status_solicitud)
            .input('comentario', comentario || null)
            .execute('InsertSolicitud');
        return result.recordset[0];
    } catch (error) {
        console.error('Error en insertSolicitud:', error.message);
        throw error;
    }
};

// Verificar si existe una solicitud rechazada para la misma combinación
const checkRejectedSolicitud = async (id_subcategoria, id_medicamento, id_proveedor) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_subcategoria', id_subcategoria)
            .input('id_medicamento', id_medicamento)
            .input('id_proveedor', id_proveedor)
            .input('status_solicitud', 'Rechazada') // Estado rechazado
            .query(`
                SELECT 1
                FROM Solicitud
                WHERE id_subcategoria = @id_subcategoria
                AND id_medicamento = @id_medicamento
                AND id_proveedor = @id_proveedor
                AND status_solicitud = @status_solicitud
            `);
        return result.recordset.length > 0;
    } catch (error) {
        console.error('Error en checkRejectedSolicitud:', error.message);
        throw error;
    }
};

// Obtener solicitudes filtradas por estado
const selectSolicitudesByStatus = async (status_solicitud) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('status_solicitud', status_solicitud)
            .execute('SelectSolicitudesByStatus');
        return result.recordset;
    } catch (error) {
        console.error('Error en selectSolicitudesByStatus:', error.message);
        throw error;
    }
};

// Actualizar el estado y comentario de una solicitud
const updateSolicitudStatus = async (id_solicitud, status_solicitud, comentario) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_solicitud', id_solicitud)
            .input('status_solicitud', status_solicitud)
            .input('comentario', comentario || null)
            .execute('UpdateSolicitudStatus');
        return result.recordset[0];
    } catch (error) {
        console.error('Error en updateSolicitudStatus:', error.message);
        throw error;
    }
};

// Eliminar una solicitud por ID
const deleteSolicitudById = async (id_solicitud) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_solicitud', id_solicitud)
            .query(`
                DELETE FROM Solicitud
                WHERE id_solicitud = @id_solicitud;
            `);
        return result.rowsAffected[0]; // Retorna el número de filas afectadas
    } catch (error) {
        console.error('Error en deleteSolicitudById:', error.message);
        throw error;
    }
};

module.exports = {
    insertSolicitud,
    selectSolicitudesByStatus,
    updateSolicitudStatus,
    deleteSolicitudById,
    checkRejectedSolicitud,
};