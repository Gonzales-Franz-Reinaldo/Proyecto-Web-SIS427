const express = require('express');
const { register, login } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Ejemplo de ruta protegida
router.get('/dashboard', protect, (req, res) => {
    res.json({ message: `Bienvenido ${req.user.rol} ${req.user.nombre}`, user: req.user });
});

module.exports = router;
