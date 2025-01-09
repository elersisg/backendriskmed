const medicamentoService = require('../services/medicamento.service.js');
const { CreateMedicamentoDTO, UpdateMedicamentoStatusDTO } = require('../DTO/medicamento.dto.js');

// Insertar un nuevo medicamento
const createMedicamento = async (req, res, next) => {
    try {
        const validatedData = await CreateMedicamentoDTO.validateAsync(req.body);
        const nuevoMedicamento = await medicamentoService.createMedicamento(validatedData);
        res.status(201).json({ message: 'Medicamento creado exitosamente', nuevoMedicamento });
    } catch (error) {
        next(error);
    }
};

// Obtener medicamentos por subcategoría
const getMedicamentoBySubcategoria = async (req, res, next) => {
    try {
        const medicamentos = await medicamentoService.getMedicamentoBySubcategoria();
        res.status(200).json(medicamentos);
    } catch (error) {
        next(error);
    }
};

// Actualizar el estado de un medicamento
const updateMedicamentoStatus = async (req, res, next) => {
    try {
        const { id_medicamento } = req.params;
        const validatedData = await UpdateMedicamentoStatusDTO.validateAsync(req.body);
        const medicamentoActualizado = await medicamentoService.updateMedicamentoStatus(id_medicamento, validatedData.status_medicamento);
        res.status(200).json({ message: 'Estado actualizado exitosamente', medicamentoActualizado });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createMedicamento,
    getMedicamentoBySubcategoria,
    updateMedicamentoStatus,
};
