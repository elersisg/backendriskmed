const adminModel = require('../models/admin.model');

// Servicio para insertar un administrador
const createAdmin = async (data) => {
    return await adminModel.insertAdmin(data.id_usuario, data.cedula_admin);
};

// Servicio para obtener todos los administradores
const getAllAdmins = async () => {
    return await adminModel.selectAllAdmins();
};

// Servicio para eliminar un administrador
const deleteAdmin = async (id_admin) => {
    return await adminModel.deleteAdminById(id_admin);
};

module.exports = {
    createAdmin,
    getAllAdmins,
    deleteAdmin,
};
