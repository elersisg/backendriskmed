require('dotenv').config(); // Cargar variables de entorno
const sql = require('mssql'); // Importar el módulo mssql

let pool; // Añadido para manejar la conexión

// Configuración de la base de datos (manteniendo lo existente)
module.exports = {
    server: process.env.DB_SERVER || 'DESKTOP-IVQK8SO',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'enmanuel0805',
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    database: process.env.DB_NAME || 'RISKMED',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },

    // Exportar sql y la función de conexión
    sql,

    // Función para conectar a la base de datos
    connectToDatabase: async () => {
        try {
            if (!pool) {
                pool = await sql.connect({
                    server: process.env.DB_SERVER || 'DESKTOP-IVQK8SO',
                    user: process.env.DB_USER || 'sa',
                    password: process.env.DB_PASSWORD || 'enmanuel0805',
                    port: parseInt(process.env.DB_PORT, 10) || 1433,
                    database: process.env.DB_NAME || 'RISKMED',
                    options: {
                        encrypt: true,
                        trustServerCertificate: true,
                    },
                });
                console.log('Conexión a la base de datos establecida.');
            }
            return pool;
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error.message);
            throw error;
        }
    },
};