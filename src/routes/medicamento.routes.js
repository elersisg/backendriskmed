const express = require('express');
const router = express.Router();
const medicamentoController = require('../controllers/medicamento.controller.js');

/**
 * @swagger
 * tags:
 *   name: Medicamentos
 *   description: Gestión de medicamentos
 */

/**
 * @swagger
 * /medicamento:
 *   post:
 *     summary: Crear un nuevo medicamento
 *     tags: [Medicamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_complejidad:
 *                 type: integer
 *               nombre_med:
 *                 type: string
 *               efectos_secundarios:
 *                 type: string
 *               funcion_med:
 *                 type: string
 *               status_medicamento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medicamento creado exitosamente
 */
router.post('/', medicamentoController.createMedicamento);

/**
 * @swagger
 * /medicamento/subcategoria:
 *   get:
 *     summary: Obtener medicamentos por subcategoría
 *     tags: [Medicamentos]
 *     responses:
 *       200:
 *         description: Lista de medicamentos
 */
router.get('/subcategoria', medicamentoController.getMedicamentoBySubcategoria);

/**
 * @swagger
 * /medicamento/{id_medicamento}:
 *   put:
 *     summary: Actualizar el estado de un medicamento
 *     tags: [Medicamentos]
 *     parameters:
 *       - name: id_medicamento
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
 *               status_medicamento:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 */
router.put('/:id_medicamento', medicamentoController.updateMedicamentoStatus);

module.exports = router;
