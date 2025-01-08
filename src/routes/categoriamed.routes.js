const express = require('express');
const router = express.Router();
const categoriaMedController = require('../controllers/categoriamed.controller.js');

/**
 * @swagger
 * tags:
 *   name: Categorías Médicas
 *   description: Gestión de categorías médicas
 */

/**
 * @swagger
 * /categoria-med:
 *   get:
 *     summary: Obtener todas las categorías médicas
 *     tags: [Categorías Médicas]
 *     responses:
 *       200:
 *         description: Lista de categorías médicas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_categoria_med:
 *                     type: integer
 *                   nombre_categoria:
 *                     type: string
 */
router.get('/', categoriaMedController.getAllCategorias);

module.exports = router;
