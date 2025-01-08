require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// Importar rutas
const usuariosRoutes = require('./src/routes/usuario.routes.js')  ; // Rutas relacionadas con usuarios

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