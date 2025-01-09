const solicitudService = require('../services/solicitud.service');
const { CreateSolicitudDTO, UpdateSolicitudStatusDTO } = require('../DTO/solicitud.dto');

// Insertar una nueva solicitud
const createSolicitud = async (req, res, next) => {
    try {
        const validatedData = await CreateSolicitudDTO.validateAsync(req.body);
        const nuevaSolicitud = await solicitudService.createSolicitud(validatedData);
        res.status(201).json({ message: 'Solicitud creada exitosamente', nuevaSolicitud });
    } catch (error) {
        next(error);
    }
};

// Obtener solicitudes filtradas por estado
const getSolicitudesByStatus = async (req, res, next) => {
    try {
        const { status_solicitud } = req.query;
        const solicitudes = await solicitudService.getSolicitudesByStatus(status_solicitud);
        res.status(200).json(solicitudes);
    } catch (error) {
        next(error);
    }
};

// Actualizar el estado y comentario de una solicitud
const updateSolicitudStatus = async (req, res, next) => {
    try {
        const { id_solicitud } = req.params;
        const validatedData = await UpdateSolicitudStatusDTO.validateAsync(req.body);
        const solicitudActualizada = await solicitudService.updateSolicitudStatus(id_solicitud, validatedData.status_solicitud, validatedData.comentario);
        res.status(200).json({ message: 'Solicitud actualizada exitosamente', solicitudActualizada });
    } catch (error) {
        next(error);
    }
};

// Eliminar una solicitud por ID
const deleteSolicitud = async (req, res, next) => {
    try {
        const { id_solicitud } = req.params;
        const result = await solicitudService.deleteSolicitud(id_solicitud);

        if (result > 0) {
            res.status(200).json({ message: `Solicitud con ID ${id_solicitud} eliminada exitosamente` });
        } else {
            res.status(404).json({ message: `Solicitud con ID ${id_solicitud} no encontrada` });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSolicitud,
    getSolicitudesByStatus,
    updateSolicitudStatus,
    deleteSolicitud,
};
