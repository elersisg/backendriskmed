const jwt = require('jsonwebtoken');


// Middleware para verificar la autenticación
const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extraer el token del encabezado
        if (!token) {
            return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar y decodificar el token
        req.user = decoded; // Almacenar la información decodificada en la solicitud
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado.' });
    }
};

// Middleware para verificar roles específicos
const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ message: 'No tienes permisos para esta acción.' });
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorize,
};