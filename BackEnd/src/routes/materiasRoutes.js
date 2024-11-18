const express = require('express');
const { getMateriasByDocente } = require('../controllers/materiasController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta protegida para obtener materias del docente
router.get('/docente', protect, getMateriasByDocente);

module.exports = router;
