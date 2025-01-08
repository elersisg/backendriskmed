const express = require('express');
const router = express.Router();
const nivelRiesgoController = require('../controllers/nivelriesgo.controller.js');

/**
 * @swagger
 * tags:
 *   name: Niveles de Riesgo
 *   description: Gestión de niveles de riesgo
 */

/**
 * @swagger
 * /nivel-riesgo/{id_nivelriesgo}:
 *   put:
 *     summary: Actualizar un nivel de riesgo
 *     tags: [Niveles de Riesgo]
 *     parameters:
 *       - name: id_nivelriesgo
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
 *               nombre_riesgo:
 *                 type: string
 *               puntuacion:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Nivel de riesgo actualizado exitosamente
 *       404:
 *         description: Nivel de riesgo no encontrado
 */
router.put('/:id_nivelriesgo', nivelRiesgoController.updateNivelRiesgo);

/**
 * @swagger
 * /nivel-riesgo:
 *   get:
 *     summary: Obtener niveles de riesgo con información relacionada
 *     tags: [Niveles de Riesgo]
 *     responses:
 *       200:
 *         description: Lista de niveles de riesgo con información relacionada
 */
router.get('/', nivelRiesgoController.selectNivelRiesgoWithJoins);

module.exports = router;
