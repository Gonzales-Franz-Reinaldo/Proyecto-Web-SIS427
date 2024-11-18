const { verifyToken } = require('../utils/jwtUtils');

exports.protect = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
};
