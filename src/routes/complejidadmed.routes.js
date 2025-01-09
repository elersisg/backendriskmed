const express = require('express');
const router = express.Router();
const complejidadMedController = require('../controllers/complejidadmed.controller.js');

/**
 * @swagger
 * tags:
 *   name: Complejidades Médicas
 *   description: Gestión de las complejidades médicas
 */

/**
 * @swagger
 * /complejidad-med:
 *   get:
 *     summary: Obtener todas las complejidades médicas
 *     tags: [Complejidades Médicas]
 *     responses:
 *       200:
 *         description: Lista de complejidades médicas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_complejidad:
 *                     type: integer
 *                   nombre_complejidad:
 *                     type: string
 */
router.get('/', complejidadMedController.getAllComplejidades);

/**
 * @swagger
 * /complejidad-med:
 *   post:
 *     summary: Crear una nueva complejidad médica
 *     tags: [Complejidades Médicas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_complejidad:
 *                 type: string
 *     responses:
 *       201:
 *         description: Complejidad creada exitosamente
 */
router.post('/', complejidadMedController.createComplejidad);

module.exports = router;
