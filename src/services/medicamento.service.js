const medicamentoModel = require('../models/medicamento.model');

// Servicio para insertar un medicamento
const createMedicamento = async (data) => {
    return await medicamentoModel.insertMedicamento(data);
};

// Servicio para obtener medicamentos por subcategoría
const getMedicamentoBySubcategoria = async () => {
    return await medicamentoModel.selectMedicamentoBySubcategoria();
};

// Servicio para actualizar el estado de un medicamento
const updateMedicamentoStatus = async (id_medicamento, status_medicamento) => {
    return await medicamentoModel.updateMedicamentoStatus(id_medicamento, status_medicamento);
};

module.exports = {
    createMedicamento,
    getMedicamentoBySubcategoria,
    updateMedicamentoStatus,
};
