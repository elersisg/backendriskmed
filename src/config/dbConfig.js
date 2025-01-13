require('dotenv').config(); // Cargar variables de entorno

// Configuración de la base de datos
module.exports = {
    server: process.env.DB_SERVER || 'DESKTOP-LAURA',
    user: process.env.DB_USER || 'loginlaura', // Usuario de la base de datos
    password: process.env.DB_PASSWORD || '190708', // Contraseña de la base de datos
    port: parseInt(process.env.DB_PORT, 10) || 1433, // Asegurar que el puerto sea un número
    database: process.env.DB_NAME || 'RISKMED', // Nombre de la base de datos
    options: {
        encrypt: true, 
        trustServerCertificate: true, 
    },
};