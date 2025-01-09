const { poolPromise } = require('../config/dbConfig.js');

// Insertar un nuevo administrador
const insertAdmin = async (id_usuario, cedula_admin) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_usuario', id_usuario)
        .input('cedula_admin', cedula_admin)
        .query(`
            INSERT INTO Admin (id_usuario, cedula_admin)
            VALUES (@id_usuario, @cedula_admin);
            SELECT SCOPE_IDENTITY() AS id_admin;
        `);
    return result.recordset[0];
};

// Seleccionar todos los administradores
const selectAllAdmins = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT 
            A.id_admin,
            U.nombre AS nombre_usuario,
            U.email AS correo_usuario,
            A.cedula_admin
        FROM Admin A
        INNER JOIN Usuario U ON A.id_usuario = U.id_usuario;
    `);
    return result.recordset;
};

// Eliminar un administrador por ID
const deleteAdminById = async (id_admin) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id_admin', id_admin)
        .query(`
            DELETE FROM Admin
            WHERE id_admin = @id_admin;
        `);
    return result.rowsAffected[0]; // Retorna el número de filas afectadas
};

module.exports = {
    insertAdmin,
    selectAllAdmins,
    deleteAdminById,
};
