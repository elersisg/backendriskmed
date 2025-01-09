const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

/**
 * @swagger
 * tags:
 *   name: Administradores
 *   description: Gestión de administradores
 */

/**
 * @swagger
 * /admin:
 *   post:
 *     summary: Crear un nuevo administrador
 *     tags: [Administradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               cedula_admin:
 *                 type: string
 *     responses:
 *       201:
 *         description: Administrador creado exitosamente
 */
router.post('/', adminController.createAdmin);

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Obtener todos los administradores
 *     tags: [Administradores]
 *     responses:
 *       200:
 *         description: Lista de administradores
 */
router.get('/', adminController.getAllAdmins);

/**
 * @swagger
 * /admin/{id_admin}:
 *   delete:
 *     summary: Eliminar un administrador por ID
 *     tags: [Administradores]
 *     parameters:
 *       - name: id_admin
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Administrador eliminado exitosamente
 *       404:
 *         description: Administrador no encontrado
 */
router.delete('/:id_admin', adminController.deleteAdmin);

module.exports = router;
