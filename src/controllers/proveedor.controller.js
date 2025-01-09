const proveedorService = require('../services/proveedor.service');
const { CreateProveedorDTO, UpdateProveedorUbicacionDTO } = require('../DTO/proveedor.dto');

// Insertar un nuevo proveedor
const createProveedor = async (req, res, next) => {
    try {
        const validatedData = await CreateProveedorDTO.validateAsync(req.body);
        const nuevoProveedor = await proveedorService.createProveedor(validatedData);
        res.status(201).json({ message: 'Proveedor creado exitosamente', nuevoProveedor });
    } catch (error) {
        next(error);
    }
};

// Obtener proveedores ordenados por evaluación
const getProveedoresOrdered = async (req, res, next) => {
    try {
        const { nombre, status_usuario } = req.query;
        const proveedores = await proveedorService.getProveedoresOrdered(nombre, status_usuario);
        res.status(200).json(proveedores);
    } catch (error) {
        next(error);
    }
};

// Actualizar la ubicación de un proveedor
const updateProveedorUbicacion = async (req, res, next) => {
    try {
        const { id_proveedor } = req.params;
        const validatedData = await UpdateProveedorUbicacionDTO.validateAsync(req.body);
        const proveedorActualizado = await proveedorService.updateProveedorUbicacion(id_proveedor, validatedData.ubicacion);
        res.status(200).json({ message: 'Ubicación actualizada exitosamente', proveedorActualizado });
    } catch (error) {
        next(error);
    }
};

// Obtener información detallada de un proveedor
const getProveedorInfo = async (req, res, next) => {
    try {
        const { id_proveedor } = req.params;
        const proveedor = await proveedorService.getProveedorInfo(id_proveedor);
        res.status(200).json(proveedor);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProveedor,
    getProveedoresOrdered,
    updateProveedorUbicacion,
    getProveedorInfo,
};
