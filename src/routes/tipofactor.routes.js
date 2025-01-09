const express = require('express');
const router = express.Router();
const tipoFactorController = require('../controllers/tipofactor.controller.js');

/**
 * @swagger
 * tags:
 *   name: Tipos de Factores
 *   description: Gestión de los tipos de factores
 */

/**
 * @swagger
 * /tipo-factor:
 *   get:
 *     summary: Obtener todos los tipos de factores
 *     tags: [Tipos de Factores]
 *     responses:
 *       200:
 *         description: Lista de tipos de factores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_tipo_factor:
 *                     type: integer
 *                   nombre:
 *                     type: string
 */
router.get('/', tipoFactorController.getAllTipoFactor);

/**
 * @swagger
 * /tipo-factor:
 *   post:
 *     summary: Crear un nuevo tipo de factor
 *     tags: [Tipos de Factores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de factor creado exitosamente
 */
router.post('/', tipoFactorController.createTipoFactor);

module.exports = router;
