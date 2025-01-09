const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedor.controller');

/**
 * @swagger
 * tags:
 *   name: Proveedores
 *   description: Gestión de proveedores
 */

/**
 * @swagger
 * /proveedor:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_categoria_nivel:
 *                 type: integer
 *               id_usuario:
 *                 type: integer
 *               RNC:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *               fecha_ultima_evaluacion:
 *                 type: string
 *                 format: date
 *               fecha_proxima_evaluacion:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente
 */
router.post('/', proveedorController.createProveedor);

/**
 * @swagger
 * /proveedor:
 *   get:
 *     summary: Obtener proveedores ordenados por evaluación
 *     tags: [Proveedores]
 *     parameters:
 *       - name: nombre
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: status_usuario
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_proveedor:
 *                     type: integer
 *                   id_categoria_nivel:
 *                     type: integer
 *                   id_usuario:
 *                     type: integer
 *                   RNC:
 *                     type: string
 *                   ubicacion:
 *                     type: string
 *                   fecha_ultima_evaluacion:
 *                     type: string
 *                     format: date
 *                   fecha_proxima_evaluacion:
 *                     type: string
 *                     format: date
 */
router.get('/', proveedorController.getProveedoresOrdered);

/**
 * @swagger
 * /proveedor/{id_proveedor}:
 *   put:
 *     summary: Actualizar la ubicación de un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - name: id_proveedor
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
 *               ubicacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ubicación actualizada exitosamente
 */
router.put('/:id_proveedor', proveedorController.updateProveedorUbicacion);

/**
 * @swagger
 * /proveedor/{id_proveedor}:
 *   get:
 *     summary: Obtener información detallada de un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - name: id_proveedor
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información detallada del proveedor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 RNC:
 *                   type: string
 *                 ubicacion:
 *                   type: string
 *                 fecha_ultima_evaluacion:
 *                   type: string
 *                   format: date
 *                 fecha_proxima_evaluacion:
 *                   type: string
 *                   format: date
 *                 nivel_riesgo:
 *                   type: string
 *                 frecuencia_inspeccion:
 *                   type: string
 *                 nombre:
 *                   type: string
 *                 email:
 *                   type: string
 *                 contrasena:
 *                   type: string
 *                 status_usuario:
 *                   type: string
 *                 categoria_nombre:
 *                   type: string
 *                 nombre_subcategoria:
 *                   type: string
 *                 nombre_riesgo:
 *                   type: string
 *                 puntuacion:
 *                   type: integer
 *                 medicamento_nombre:
 *                   type: string
 */
router.get('/:id_proveedor', proveedorController.getProveedorInfo);

module.exports = router;
