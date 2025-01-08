const nivelRiesgoService = require('../services/nivelriesgo.service.js');

// Actualizar nivel de riesgo
const updateNivelRiesgo = async (req, res, next) => {
    try {
        const { id_nivelriesgo } = req.params; // ID desde la URL
        const data = req.body; // Datos a actualizar desde el cuerpo de la solicitud
        const nivelRiesgo = await nivelRiesgoService.updateNivelRiesgo(id_nivelriesgo, data);
        res.status(200).json({ message: 'Nivel de riesgo actualizado', nivelRiesgo });
    } catch (error) {
        next(error); // Manejo de errores
    }
};

// Obtener niveles de riesgo con joins
const selectNivelRiesgoWithJoins = async (req, res, next) => {
    try {
        const nivelesRiesgo = await nivelRiesgoService.selectNivelRiesgoWithJoins();
        res.status(200).json(nivelesRiesgo);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateNivelRiesgo,
    selectNivelRiesgoWithJoins,
};
