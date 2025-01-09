const nivelRiesgoService = require('../services/nivelriesgo.service.js');
const { UpdateNivelRiesgoDTO } = require('../DTO/nivelriesgo.dto.js');

// Actualizar un nivel de riesgo
const updateNivelRiesgo = async (req, res, next) => {
    try {
        const { id_nivelriesgo } = req.params; // ID desde los parámetros
        const validatedData = await UpdateNivelRiesgoDTO.validateAsync(req.body); // Validar datos con DTO
        const nivelRiesgo = await nivelRiesgoService.updateNivelRiesgo(id_nivelriesgo, validatedData);
        res.status(200).json({ message: 'Nivel de riesgo actualizado exitosamente', nivelRiesgo });
    } catch (error) {
        next(error); // Manejo de errores
    }
};

// Obtener niveles de riesgo con información relacionada
const getNivelRiesgoWithJoins = async (req, res, next) => {
    try {
        const nivelesRiesgo = await nivelRiesgoService.getNivelRiesgoWithJoins();
        res.status(200).json(nivelesRiesgo);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateNivelRiesgo,
    getNivelRiesgoWithJoins,
};
