const adminService = require('../services/admin.service');
const { CreateAdminDTO } = require('../DTO/admin.dto');

// Insertar un nuevo administrador
const createAdmin = async (req, res, next) => {
    try {
        const validatedData = await CreateAdminDTO.validateAsync(req.body);
        const nuevoAdmin = await adminService.createAdmin(validatedData);
        res.status(201).json({ message: 'Administrador creado exitosamente', nuevoAdmin });
    } catch (error) {
        next(error);
    }
};

// Obtener todos los administradores
const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await adminService.getAllAdmins();
        res.status(200).json(admins);
    } catch (error) {
        next(error);
    }
};

// Eliminar un administrador
const deleteAdmin = async (req, res, next) => {
    try {
        const { id_admin } = req.params;
        const result = await adminService.deleteAdmin(id_admin);

        if (result > 0) {
            res.status(200).json({ message: `Administrador con ID ${id_admin} eliminado exitosamente` });
        } else {
            res.status(404).json({ message: `Administrador con ID ${id_admin} no encontrado` });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAdmin,
    getAllAdmins,
    deleteAdmin,
};
