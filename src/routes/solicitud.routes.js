const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitud.controller');

/**
 * @swagger
 * tags:
 *   name: Solicitudes
 *   description: Gestión de solicitudes
 */

/**
 * @swagger
 * /solicitud:
 *   post:
 *     summary: Crear una nueva solicitud
 *     tags: [Solicitudes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_subcategoria:
 *                 type: integer
 *               id_medicamento:
 *                 type: integer
 *               id_proveedor:
 *                 type: integer
 *               metodo_produccion:
 *                 type: string
 *               cantidad_med:
 *                 type: integer
 *               status_solicitud:
 *                 type: string
 *               comentario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 */
router.post('/', solicitudController.createSolicitud);

/**
 * @swagger
 * /solicitud:
 *   get:
 *     summary: Obtener solicitudes filtradas por estado
 *     tags: [Solicitudes]
 *     parameters:
 *       - name: status_solicitud
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de solicitudes filtradas
 */
router.get('/', solicitudController.getSolicitudesByStatus);

/**
 * @swagger
 * /solicitud/{id_solicitud}:
 *   put:
 *     summary: Actualizar el estado y comentario de una solicitud
 *     tags: [Solicitudes]
 *     parameters:
 *       - name: id_solicitud
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status_solicitud:
 *                 type: string
 *               comentario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Solicitud actualizada exitosamente
 */
router.put('/:id_solicitud', solicitudController.updateSolicitudStatus);

/**
 * @swagger
 * /solicitud/{id_solicitud}:
 *   delete:
 *     summary: Eliminar una solicitud por ID
 *     tags: [Solicitudes]
 *     parameters:
 *       - name: id_solicitud
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Solicitud eliminada exitosamente
 *       404:
 *         description: Solicitud no encontrada
 */
router.delete('/:id_solicitud', solicitudController.deleteSolicitud);

module.exports = router;
