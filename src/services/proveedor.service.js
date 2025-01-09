const proveedorModel = require('../models/proveedor.model');

// Servicio para insertar un proveedor
const createProveedor = async (data) => {
    return await proveedorModel.insertProveedor(data);
};

// Servicio para obtener proveedores ordenados por evaluación
const getProveedoresOrdered = async (nombre, status_usuario) => {
    return await proveedorModel.selectProveedoresOrdered(nombre, status_usuario);
};

// Servicio para actualizar la ubicación del proveedor
const updateProveedorUbicacion = async (id_proveedor, ubicacion) => {
    return await proveedorModel.updateProveedorUbicacion(id_proveedor, ubicacion);
};

// Servicio para obtener información detallada de un proveedor
const getProveedorInfo = async (id_proveedor) => {
    return await proveedorModel.selectProveedorInfo(id_proveedor);
};

module.exports = {
    createProveedor,
    getProveedoresOrdered,
    updateProveedorUbicacion,
    getProveedorInfo,
};
