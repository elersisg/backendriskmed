const solicitudModel = require('../models/solicitud.model');

// Servicio para insertar una solicitud
const createSolicitud = async (data) => {
    return await solicitudModel.insertSolicitud(data);
};

// Servicio para obtener solicitudes filtradas por estado
const getSolicitudesByStatus = async (status_solicitud) => {
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

module.exports = {
    createSolicitud,
    getSolicitudesByStatus,
    updateSolicitudStatus,
    deleteSolicitud,
};
