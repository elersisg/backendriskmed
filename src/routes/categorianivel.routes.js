const express = require('express');
const router = express.Router();
const categoriaNivelController = require('../controllers/categorianivel.controller');

/**
 * @swagger
 * tags:
 *   name: Categorías de Nivel
 *   description: Gestión de las categorías de nivel
 */

/**
 * @swagger
 * /categoria-nivel:
 *   get:
 *     summary: Obtener todas las categorías de nivel
 *     tags: [Categorías de Nivel]
 *     responses:
 *       200:
 *         description: Lista de categorías de nivel
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_categoria_nivel:
 *                     type: integer
 *                   nivel_riesgo:
 *                     type: string
 *                   frecuencia_inspeccion:
 *                     type: string
 */
router.get('/', categoriaNivelController.getAllCategoriaNivel);

/**
 * @swagger
 * /categoria-nivel:
 *   post:
 *     summary: Crear una nueva categoría de nivel
 *     tags: [Categorías de Nivel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nivel_riesgo:
 *                 type: string
 *               frecuencia_inspeccion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoría de nivel creada exitosamente
 */
router.post('/', categoriaNivelController.createCategoriaNivel);

module.exports = router;
