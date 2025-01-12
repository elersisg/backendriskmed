require('dotenv').config(); // Cargar variables de entorno

// Configuración de la base de datos
module.exports = {
    server: process.env.DB_SERVER || 'DESKTOP-IVQK8SO',
    user: process.env.DB_USER || 'sa', // Usuario de la base de datos
    password: process.env.DB_PASSWORD || 'enmanuel0805', // Contraseña de la base de datos
    port: parseInt(process.env.DB_PORT, 10), // Asegurar que el puerto sea un número
    database: process.env.DB_NAME || 'RISKMED', // Nombre de la base de datos
    options: {
        encrypt: true, 
        trustServerCertificate: true, 
    },
};