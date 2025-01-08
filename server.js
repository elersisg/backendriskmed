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
  },
  apis: ['./src/routes/*.js'], 
};

//Importar rutas
const usuariosRoutes = require('./src/routes/usuario.routes.js')  ; // Rutas relacionadas con usuarios
const nivelRiesgoRoutes = require('./src/routes/nivelriesgo.routes.js'); // Rutas relacionadas con niveles de riesgo
const categoriaMedRoutes = require('./src/routes/categoriamed.routes.js'); // Rutas relacionadas con categorías médicas


// Registrar rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/nivel-riesgo', nivelRiesgoRoutes);
app.use('/api/categoria-med', categoriaMedRoutes); // Nueva ruta para categorías médicas



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