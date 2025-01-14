const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrae el token del header
  
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticación requerido' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token no válido o expirado' });
      }
      req.user = user; // Adjunta los datos del usuario al objeto `req`
      next();
    });
  };

module.exports = { authenticateToken };
