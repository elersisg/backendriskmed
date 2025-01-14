const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rol:
 *                 type: string
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               status_usuario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
  *     security:
 *       - BearerAuth: []  # Aquí indicamos que esta ruta requiere autenticación JWT
 */
router.post('/insert', authenticateToken, usuarioController.insertUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Autenticar un usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *     security:
 *       - BearerAuth: []  # Aquí indicamos que esta ruta requiere autenticación JWT
 */
router.post('/login',authenticateToken, usuarioController.loginUsuario);

/**
 * @swagger
 * /usuarios/{id_usuario}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id_usuario
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
 *               contrasena:
 *                 type: string
 *               email:
 *                 type: string
 *               status_usuario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 */
router.put('/:id_usuario', usuarioController.updateUsuario); 

/**
 * @swagger
 * /usuarios/{id_usuario}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - name: id_usuario
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id_usuario', usuarioController.deleteUsuario); 

module.exports = router;
