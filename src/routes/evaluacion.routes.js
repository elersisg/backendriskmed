const express = require('express');
const router = express.Router();
const evaluacionController = require('../controllers/evaluacion.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Evaluaciones
 *   description: Gestión de evaluaciones
 */

// Proteger rutas
router.post('/', authenticate, authorize(['admin']), evaluacionController.createEvaluacion);
router.get('/', authenticate, authorize(['admin', 'inspector']), evaluacionController.getEvaluacionesWithFilters);
router.put('/:id_evaluacion', authenticate, authorize(['admin']), evaluacionController.updateEvaluacion);
router.delete('/:id_evaluacion', authenticate, authorize(['admin']), evaluacionController.deleteEvaluacion);

module.exports = router;
