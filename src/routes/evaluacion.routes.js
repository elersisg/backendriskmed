const express = require('express');
const router = express.Router();
const evaluacionController = require('../controllers/evaluacion.controller');

/**
 * @swagger
 * tags:
 *   name: Evaluaciones
 *   description: Gestión de evaluaciones
 */

/**
 * @swagger
 * /evaluacion:
 *   post:
 *     summary: Crear una nueva evaluación
 *     tags: [Evaluaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_proveedor:
 *                 type: integer
 *               id_categoria_nivel:
 *                 type: integer
 *               id_inspector:
 *                 type: integer
 *               riesgo_establecimiento:
 *                 type: number
 *                 format: float
 *               resultado:
 *                 type: number
 *                 format: float
 *               observacion:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               status_evaluacion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evaluación creada exitosamente
 */
router.post('/', evaluacionController.createEvaluacion);

/**
 * @swagger
 * /evaluacion:
 *   get:
 *     summary: Obtener evaluaciones con filtros
 *     tags: [Evaluaciones]
 *     parameters:
 *       - name: id_proveedor
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *       - name: id_inspector
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *       - name: fecha_inicio
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *       - name: fecha_fin
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Lista de evaluaciones filtradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_evaluacion:
 *                     type: integer
 *                   id_proveedor:
 *                     type: integer
 *                   ubicacion_proveedor:
 *                     type: string
 *                   id_inspector:
 *                     type: integer
 *                   nombre_inspector:
 *                     type: string
 *                   fecha:
 *                     type: string
 *                     format: date
 *                   riesgo_establecimiento:
 *                     type: number
 *                     format: float
 *                   resultado:
 *                     type: number
 *                     format: float
 *                   observacion:
 *                     type: string
 *                   status_evaluacion:
 *                     type: string
 */
router.get('/', evaluacionController.getEvaluacionesWithFilters);

/**
 * @swagger
 * /evaluacion/{id_evaluacion}:
 *   put:
 *     summary: Actualizar una evaluación
 *     tags: [Evaluaciones]
 *     parameters:
 *       - name: id_evaluacion
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
 *               id_categoria_nivel:
 *                 type: integer
 *               riesgo_establecimiento:
 *                 type: number
 *                 format: float
 *               resultado:
 *                 type: number
 *                 format: float
 *               observacion:
 *                 type: string
 *               status_evaluacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evaluación actualizada exitosamente
 */
router.put('/:id_evaluacion', evaluacionController.updateEvaluacion);

/**
 * @swagger
 * /evaluacion/{id_evaluacion}:
 *   delete:
 *     summary: Eliminar una evaluación por ID
 *     tags: [Evaluaciones]
 *     parameters:
 *       - name: id_evaluacion
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evaluación eliminada exitosamente
 *       404:
 *         description: Evaluación no encontrada
 */
router.delete('/:id_evaluacion', evaluacionController.deleteEvaluacion);

/**
 * @swagger
 * /evaluacion/calculate-risk:
 *   post:
 *     summary: Calcular y guardar el riesgo del establecimiento
 *     tags: [Evaluaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nivelRiesgoAlimento:
 *                 type: number
 *               scores:
 *                 type: array
 *                 items:
 *                   type: number
 *               id_evaluacion:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cálculo realizado y guardado exitosamente
 *       400:
 *         description: Error de validación en los datos de entrada
 */
router.post('/calculate-risk', evaluacionController.calculateRisk);

module.exports = router;
