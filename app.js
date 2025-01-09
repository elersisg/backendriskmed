require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Importar rutas
const usuariosRoutes = require('./src/routes/usuario.routes.js')  ; // Rutas relacionadas con usuarios
const nivelRiesgoRoutes = require('./src/routes/nivelriesgo.routes.js'); // Rutas relacionadas con niveles de riesgo
const categoriaMedRoutes = require('./src/routes/categoriamed.routes.js'); // Rutas relacionadas con categorías médicas
const subcategoriaMedRoutes = require('./src/routes/subcategoriamed.routes.js'); // Ruta para subcategorías médicas
const complejidadMedRoutes = require('./src/routes/complejidadmed.routes.js'); // Rutas relacionadas con Complejidad_med
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
  apis: ['./src/routes/*.js'], // Ajusta esto si las rutas están en otra ubicación
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Middlewares globales
app.use(cors()); // Habilitar CORS para todos los orígenes
app.use(express.json()); // Parsear JSON en las solicitudes
app.use(express.urlencoded({ extended: true })); // Parsear datos de formulario
app.use(morgan('dev')); // Registrar solicitudes HTTP en consola


// Documentación de Swagger
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Registrar rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/nivel-riesgo', nivelRiesgoRoutes);
app.use('/api/categoria-med', categoriaMedRoutes); // Nueva ruta para categorías médicas
app.use('/api/subcategoria-med', subcategoriaMedRoutes); // Nueva ruta para subcategorías médicas
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