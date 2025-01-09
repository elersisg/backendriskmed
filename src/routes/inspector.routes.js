const express = require('express');
const router = express.Router();
const inspectorController = require('../controllers/inspector.controller');

/**
 * @swagger
 * tags:
 *   name: Inspectores
 *   description: Gestión de inspectores
 */

/**
 * @swagger
 * /inspector:
 *   post:
 *     summary: Crear un nuevo inspector
 *     tags: [Inspectores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               cedula_inspector:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inspector creado exitosamente
 */
router.post('/', inspectorController.createInspector);

/**
 * @swagger
 * /inspector:
 *   get:
 *     summary: Obtener lista de inspectores con filtro opcional por nombre
 *     tags: [Inspectores]
 *     parameters:
 *       - name: nombre
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de inspectores
 */
router.get('/', inspectorController.getInspectoresByNombre);

/**
 * @swagger
 * /inspector/evaluaciones:
 *   get:
 *     summary: Obtener inspectores con evaluaciones recientes
 *     tags: [Inspectores]
 *     responses:
 *       200:
 *         description: Lista de inspectores con evaluaciones recientes
 */
router.get('/evaluaciones', inspectorController.getInspectoresWithEvaluations);

/**
 * @swagger
 * /inspector/{id_inspector}:
 *   delete:
 *     summary: Eliminar un inspector por ID
 *     tags: [Inspectores]
 *     parameters:
 *       - name: id_inspector
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inspector eliminado exitosamente
 *       404:
 *         description: Inspector no encontrado
 */
router.delete('/:id_inspector', inspectorController.deleteInspector);


module.exports = router;
