const express = require('express');
const router = express.Router();
const subcategoriaMedController = require('../controllers/subcategoriamed.controller.js');

/**
 * @swagger
 * tags:
 *   name: Subcategorías Médicas
 *   description: Gestión de subcategorías médicas
 */

/**
 * @swagger
 * /subcategoria-med/categoria/{id_categoria_med}:
 *   get:
 *     summary: Obtener subcategorías por ID de categoría médica
 *     tags: [Subcategorías Médicas]
 *     parameters:
 *       - name: id_categoria_med
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de subcategorías médicas asociadas a la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_subcategoria:
 *                     type: integer
 *                   nombre_subcategoria:
 *                     type: string
 *                   nombre_riesgo:
 *                     type: string
 *                   puntuacion:
 *                     type: integer
 */
router.get('/categoria/:id_categoria_med', subcategoriaMedController.getSubcategoriasByCategoria);

module.exports = router;
