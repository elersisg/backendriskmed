require('dotenv').config(); // Cargar variables de entorno
const sql = require('mssql');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const chalk = require('chalk');
const app = require('./app.js'); // Importar la aplicación configurada
const dbConfig = require('./src/config/dbConfig.js'); // Configuración de base de datos

const PORT = process.env.PORT || 3000;

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
        url: `http://localhost:${PORT}`,
        description: 'Servidor de desarrollo',
      },
    ],
    security: [
      {
        BearerAuth: [] // Aplica el esquema de seguridad global para la autenticación
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Usando JWT como método de autenticación
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // Rutas de la API
};

// Importar rutas
const usuariosRoutes = require('./src/routes/usuario.routes.js'); // Rutas relacionadas con usuarios
const nivelRiesgoRoutes = require('./src/routes/nivelriesgo.routes.js'); // Rutas relacionadas con niveles de riesgo
const categoriaMedRoutes = require('./src/routes/categoriamed.routes.js'); // Rutas relacionadas con categorías médicas
const subcategoriaMedRoutes = require('./src/routes/subcategoriamed.routes.js'); // Nueva ruta para subcategorías médicas
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

// Registrar rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/nivel-riesgo', nivelRiesgoRoutes);
app.use('/api/categoria-med', categoriaMedRoutes); // Nueva ruta para categorías médicas
app.use('/api/subcategoria-med', subcategoriaMedRoutes); // Nueva ruta para subcategorías médicas
app.use('/api/complejidad-med', complejidadMedRoutes);
app.use('/api/medicamento', medicamentoRoutes);
app.use('/api/tipo-factor', tipoFactorRoutes);
app.use('/api/categoria-nivel', categoriaNivelRoutes);
app.use('/api/inspector', inspectorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/proveedor', proveedorRoutes);
app.use('/api/solicitud', solicitudRoutes);
app.use('/api/evaluacion', evaluacionRoutes);
app.use('/api/factor', factorRoutes);

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Conexión a la base de datos
const pool = new sql.ConnectionPool(dbConfig);
pool.connect()
  .then(() => {
    console.log(chalk.green('Conexión a la base de datos exitosa'));
  })
  .catch((err) => {
    console.error(chalk.red('Error al conectar a la base de datos:'), err.message);
    process.exit(1); // Detener el servidor si falla la conexión
  });

// Inicia el servidor
const startServer = async (retries = 5) => {
  try {
    app.listen(PORT, () => {
      console.log(chalk.green(`Servidor ejecutándose en http://localhost:${PORT}`));
      console.log(chalk.blue(`Swagger disponible en http://localhost:${PORT}/api-docs`));
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      if (retries > 0) {
        console.log(chalk.yellow(`El puerto ${PORT} está ocupado, intentando con el puerto ${PORT + 1}`));
        process.env.PORT = PORT + 1;
        await startServer(retries - 1);
      } else {
        console.error(chalk.red('No se encontraron puertos disponibles después de 5 intentos'));
        process.exit(1);
      }
    } else {
      console.error(chalk.red('Error al iniciar el servidor:'), error);
      process.exit(1);
    }
  }
};

startServer();
