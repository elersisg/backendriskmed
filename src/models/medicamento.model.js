const { connectToDatabase } = require('../config/dbConfig');

// Insertar un nuevo medicamento
const insertMedicamento = async (data) => {
    const pool = await connectToDatabase(); // Usar la función para obtener la conexión
    const { id_complejidad, nombre_med, efectos_secundarios, funcion_med, status_medicamento } = data;
    const result = await pool.request()
        .input('id_complejidad', id_complejidad)
        .input('nombre_med', nombre_med)
        .input('efectos_secundarios', efectos_secundarios)
        .input('funcion_med', funcion_med)
        .input('status_medicamento', status_medicamento)
        .execute('InsertMedicamento');
    return result.recordset[0];
};

// Seleccionar medicamentos por subcategoría
const selectMedicamentoBySubcategoria = async () => {
    const pool = await connectToDatabase();
    const result = await pool.request().execute('SelectMedicamentoBySubcategoria');
    return result.recordset;
};

// Actualizar el estado de un medicamento
const updateMedicamentoStatus = async (id_medicamento, status_medicamento) => {
    const pool = await connectToDatabase();
    const result = await pool.request()
        .input('id_medicamento', id_medicamento)
        .input('status_medicamento', status_medicamento)
        .execute('UpdateMedicamentoStatus');
    return result.recordset[0];
};

module.exports = {
    insertMedicamento,
    selectMedicamentoBySubcategoria,
    updateMedicamentoStatus,
};