const jwt = require('jsonwebtoken');

const generateToken = (usuario) => {
    return jwt.sign(
        { id_usuario: usuario.id_usuario, rol: usuario.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports = {
    generateToken,
};