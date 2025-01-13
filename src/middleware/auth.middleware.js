const jwt = require('jsonwebtoken');

// Middleware para autenticar tokens JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extrae el token del encabezado
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica y decodifica el token
        req.user = decoded; // Agrega la información del usuario al objeto req
        next(); // Permite que la solicitud continúe
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

// Middleware para verificar roles específicos
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
        }
        next(); // Permite que la solicitud continúe
    };
};

module.exports = {
    authenticateToken,
    authorizeRole,
};