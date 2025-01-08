require('dotenv').config(); // Cargar variables de entorno

// Configuración de la base de datos
module.exports = {
    server: process.env.DB_SERVER || 'localhost',
    user: process.env.DB_USER, // Usuario de la base de datos
    password: process.env.DB_PASSWORD, // Contraseña de la base de datos
    port: parseInt(process.env.DB_PORT, 10), // Asegurar que el puerto sea un número
    database: process.env.DB_NAME, // Nombre de la base de datos
    options: {
        encrypt: true, 
        trustServerCertificate: true, 
    },
};