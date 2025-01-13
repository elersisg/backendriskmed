require('dotenv').config(); // Cargar variables de entorno
const sql = require('mssql');
const chalk = require('chalk');
const app = require('./app.js'); // Importar la aplicación configurada
const dbConfig = require('./src/config/dbConfig.js'); // Configuración de base de datos

const PORT = process.env.PORT || 3000;
app.set('port', PORT); // Pasar el puerto como una propiedad en app

// Conexión a la base de datos
const pool = new sql.ConnectionPool(dbConfig);

pool.connect()
  .then(() => {
    console.log(chalk.green('Conexión a la base de datos exitosa'));

    // Inicia el servidor una vez que la base de datos esté conectada
    app.listen(PORT, () => {
      console.log(chalk.green(`Servidor ejecutándose en http://localhost:${PORT}`));
      console.log(chalk.blue(`Swagger disponible en http://localhost:${PORT}/api-docs`));
    });
  })
  .catch((err) => {
    console.error(chalk.red('Error al conectar a la base de datos:'), err.message);
    process.exit(1); // Detener el servidor si falla la conexión
  });