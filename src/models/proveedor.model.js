const { connectToDatabase } = require('../config/dbConfig');

// Insertar un nuevo proveedor
const insertProveedor = async (data) => {
    try {
        const pool = await connectToDatabase();
        const { id_categoria_nivel, id_usuario, RNC, ubicacion, fecha_ultima_evaluacion, fecha_proxima_evaluacion } = data;
        const result = await pool.request()
            .input('id_categoria_nivel', id_categoria_nivel)
            .input('id_usuario', id_usuario)
            .input('RNC', RNC)
            .input('ubicacion', ubicacion)
            .input('fecha_ultima_evaluacion', fecha_ultima_evaluacion)
            .input('fecha_proxima_evaluacion', fecha_proxima_evaluacion)
            .execute('InsertProveedor');
        return result.recordset[0];
    } catch (error) {
        console.error('Error en insertProveedor:', error.message);
        throw error;
    }
};

// Obtener proveedores ordenados por evaluación
const selectProveedoresOrdered = async (nombre, status_usuario) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('nombre', nombre || null)
            .input('status_usuario', status_usuario || null)
            .execute('SelectProveedoresOrdered');
        return result.recordset;
    } catch (error) {
        console.error('Error en selectProveedoresOrdered:', error.message);
        throw error;
    }
};

// Actualizar la ubicación del proveedor
const updateProveedorUbicacion = async (id_proveedor, ubicacion) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_proveedor', id_proveedor)
            .input('ubicacion', ubicacion)
            .execute('UpdateProveedorUbicacion');
        return result.recordset[0];
    } catch (error) {
        console.error('Error en updateProveedorUbicacion:', error.message);
        throw error;
    }
};

// Obtener información detallada de un proveedor
const selectProveedorInfo = async (id_proveedor) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id_proveedor', id_proveedor)
            .execute('SelectProveedorInfo');
        return result.recordset[0];
    } catch (error) {
        console.error('Error en selectProveedorInfo:', error.message);
        throw error;
    }
};

module.exports = {
    insertProveedor,
    selectProveedoresOrdered,
    updateProveedorUbicacion,
    selectProveedorInfo,
};