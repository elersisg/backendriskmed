const { poolPromise } = require('../config/dbConfig');

// Insertar una nueva solicitud
const insertSolicitud = async (data) => {
    const pool = await poolPromise;
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
};

// Obtener solicitudes filtradas por estado
const selectSolicitudesByStatus = async (status_solicitud) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('status_solicitud', status_solicitud)
        .execute('SelectSolicitudesByStatus');
    return result.recordset;
};

// Actualizar el estado y comentario de una solicitud
const updateSolicitudStatus = async (id_solicitud, status_solicitud, comentario) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_solicitud', id_solicitud)
        .input('status_solicitud', status_solicitud)
        .input('comentario', comentario || null)
        .execute('UpdateSolicitudStatus');
    return result.recordset[0];
};

// Eliminar una solicitud por ID
const deleteSolicitudById = async (id_solicitud) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_solicitud', id_solicitud)
        .query(`
            DELETE FROM Solicitud
            WHERE id_solicitud = @id_solicitud;
        `);
    return result.rowsAffected[0]; // Retorna el número de filas afectadas
};

module.exports = {
    insertSolicitud,
    selectSolicitudesByStatus,
    updateSolicitudStatus,
    deleteSolicitudById,
};
