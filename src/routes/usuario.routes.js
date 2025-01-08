const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller.js');

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
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
 */
router.post('/', usuarioController.createUsuario);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Autenticar un usuario
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
 *       401:
 *         description: Credenciales inválidas o usuario inactivo
 */
router.post('/login', usuarioController.loginUsuario);

/**
 * @swagger
 * /usuarios/{id_usuario}:
 *   put:
 *     summary: Actualizar un usuario
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
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id_usuario', usuarioController.updateUsuario);

/**
 * @swagger
 * /usuarios/{id_usuario}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     parameters:
 *       - name: id_usuario
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id_usuario', usuarioController.getUsuarioById);

/**
 * @swagger
 * /usuarios/{id_usuario}:
 *   delete:
 *     summary: Eliminar un usuario por ID
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
