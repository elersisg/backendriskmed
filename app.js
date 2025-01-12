require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Importar rutas
const usuariosRoutes = require('./src/routes/usuario.routes.js');
const nivelRiesgoRoutes = require('./src/routes/nivelriesgo.routes.js');
const categoriaMedRoutes = require('./src/routes/categoriamed.routes.js');
const subcategoriaMedRoutes = require('./src/routes/subcategoriamed.routes.js');
const complejidadMedRoutes = require('./src/routes/complejidadmed.routes.js');
const medicamentoRoutes = require('./src/routes/medicamento.routes.js');
const tipoFactorRoutes = require('./src/routes/tipofactor.routes.js');
const categoriaNivelRoutes = require('./src/routes/categorianivel.routes.js');
const inspectorRoutes = require('./src/routes/inspector.routes.js');
const adminRoutes = require('./src/routes/admin.routes.js');
const proveedorRoutes = require('./src/routes/proveedor.routes.js');
const solicitudRoutes = require('./src/routes/solicitud.routes.js');
const evaluacionRoutes = require('./src/routes/evaluacion.routes.js');
const factorRoutes = require('./src/routes/factor.routes.js');

const app = express();

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Riesgos',
      version: '1.0.0',
      description: 'API para gestionar riesgos, usuarios y actividades relacionadas.',
      contact: {
        name: 'Developer',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor de desarrollo',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Documentación de Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Ruta para calcular el riesgo del medicamento
app.post("/api/calculate-risk", (req, res) => {
    try {
        const { nivelRiesgoMedicamento, scores } = req.body;

        // Validaciones iniciales
        if (
            typeof nivelRiesgoMedicamento !== "number" ||
            nivelRiesgoMedicamento < 1 ||
            nivelRiesgoMedicamento > 3
        ) {
            return res.status(400).json({
                error: "El nivel de riesgo del medicamento debe ser un número entre 1 (Bajo) y 3 (Alto).",
            });
        }

        if (!scores || scores.length !== 6) {
            return res.status(400).json({
                error: "El array de puntuaciones debe contener exactamente 6 valores.",
            });
        }

        if (scores.some((score) => typeof score !== "number" || score < 0)) {
            return res.status(400).json({
                error: "Las puntuaciones deben ser números válidos mayores o iguales a 0.",
            });
        }

        // Pesos para cada factor de riesgo
        const weights = [0.16, 0.09, 0.56, 0.05, 0.06, 0.08];

        // Cálculo del Riesgo del Medicamento
        const riesgoMedicamento = scores.reduce(
            (total, score, index) => total + score * weights[index],
            0
        );

        // Cálculo del Riesgo Total (Riesgo Medicamento x Riesgo Establecimiento)
        const riesgoTotal = nivelRiesgoMedicamento * riesgoMedicamento;

        // Enviar los resultados al cliente
        res.status(200).json({
            message: "Cálculo realizado exitosamente",
            nivel_riesgo_medicamento: nivelRiesgoMedicamento,
            riesgo_medicamento: riesgoMedicamento.toFixed(2),
            riesgo_total: riesgoTotal.toFixed(2),
        });
    } catch (error) {
        console.error("Error al calcular el riesgo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Registrar rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/nivel-riesgo', nivelRiesgoRoutes);
app.use('/api/categoria-med', categoriaMedRoutes);
app.use('/api/subcategoria-med', subcategoriaMedRoutes);
app.use('/api/complejidad-med', complejidadMedRoutes);
app.use('/api/tipo-factor', tipoFactorRoutes);
app.use('/api/categoria-nivel', categoriaNivelRoutes);
app.use('/api/medicamento', medicamentoRoutes);
app.use('/api/inspector', inspectorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/proveedor', proveedorRoutes);
app.use('/api/solicitud', solicitudRoutes);
app.use('/api/evaluacion', evaluacionRoutes);
app.use('/api/factor', factorRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware global para manejar errores
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;
