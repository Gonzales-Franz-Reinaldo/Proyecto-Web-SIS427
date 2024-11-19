const express = require('express');
const {
    getMateriasByDocente,
    getEstudiantesByAsignatura,
    getEstudiante,
    removeEstudianteFromAsignatura,
    contactEstudiante,
} = require('../controllers/materiasController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta protegida para obtener materias del docente
router.get('/docente', protect, getMateriasByDocente);

// Ruta para obtener estudiantes por asignatura
router.get('/:id_asignatura/estudiantes', getEstudiantesByAsignatura);

// Ruta para obtener un estudiante específico
router.get('/estudiantes/:id_estudiante', getEstudiante);

// Ruta para eliminar estudiante de una asignatura
router.delete('/:id_asignatura/estudiantes/:id_estudiante', removeEstudianteFromAsignatura);

// Ruta para contactar a un estudiante
router.post('/:id_asignatura/estudiantes/:id_estudiante/contactar', contactEstudiante);

module.exports = router;
