const solicitudModel = require('../models/solicitud.model');

// Servicio para insertar una solicitud
const createSolicitud = async (data) => {
    // Verificar si ya existe una solicitud rechazada para la misma combinación
    const solicitudExistente = await solicitudModel.checkRejectedSolicitud(
        data.id_subcategoria,
        data.id_medicamento,
        data.id_proveedor
    );

    if (solicitudExistente) {
        throw new Error('Ya existe una solicitud rechazada para esta combinación de subcategoría, medicamento y proveedor.');
    }

    // Insertar la nueva solicitud
    return await solicitudModel.insertSolicitud(data);
};

// Servicio para obtener solicitudes filtradas por estado
const getSolicitudesByStatus = async (status_solicitud) => {
    if (status_solicitud === 'Todas') {
        return await solicitudModel.selectAllSolicitudes(); // Agrega un método para seleccionar todas las solicitudes
    }
    return await solicitudModel.selectSolicitudesByStatus(status_solicitud);
};

// Servicio para actualizar el estado y comentario de una solicitud
const updateSolicitudStatus = async (id_solicitud, status_solicitud, comentario) => {
    return await solicitudModel.updateSolicitudStatus(id_solicitud, status_solicitud, comentario);
};

// Servicio para eliminar una solicitud
const deleteSolicitud = async (id_solicitud) => {
    return await solicitudModel.deleteSolicitudById(id_solicitud);
};

// Obtener todas las solicitudes
const selectAllSolicitudes = async () => {
    const pool = await poolPromise;
    const result = await pool.request()
        .query('SELECT * FROM Solicitud');
    return result.recordset;
};


module.exports = {
    createSolicitud,
    getSolicitudesByStatus,
    updateSolicitudStatus,
    deleteSolicitud,
    selectAllSolicitudes,
};

