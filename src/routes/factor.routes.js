const express = require('express');
const router = express.Router();
const factorController = require('../controllers/factor.controller.js');

/**
 * @swagger
 * tags:
 *   name: Factores
 *   description: Gestión de factores de riesgo
 */

/**
 * @swagger
 * /factor:
 *   post:
 *     summary: Crear un nuevo factor
 *     tags: [Factores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_tipofactor:
 *                 type: integer
 *               id_evaluacion:
 *                 type: integer
 *               categoriariesgo:
 *                 type: string
 *               puntaje:
 *                 type: string
 *               valor:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Factor creado exitosamente
 */
router.post('/', factorController.createFactor);

/**
 * @swagger
 * /factor/evaluacion/{id_evaluacion}:
 *   get:
 *     summary: Obtener factores por evaluación
 *     tags: [Factores]
 *     parameters:
 *       - name: id_evaluacion
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de factores asociados a la evaluación
 */
router.get('/evaluacion/:id_evaluacion', factorController.getFactorsByEvaluacion);

/**
 * @swagger
 * /factor/{id_factor}:
 *   delete:
 *     summary: Eliminar un factor por ID
 *     tags: [Factores]
 *     parameters:
 *       - name: id_factor
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Factor eliminado exitosamente
 *       404:
 *         description: Factor no encontrado
 */
router.delete('/:id_factor', factorController.deleteFactor);

module.exports = router;
