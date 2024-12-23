// routes/materialesRoutes.js
const express = require('express');
const upload = require('../middlewares/upload');
const {
    getMaterialesByAsignatura,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    getMaterialesPorAsignatura
} = require('../controllers/materialesController');

const router = express.Router();

router.get('/:id_asignatura', getMaterialesByAsignatura);
router.post('/', upload.single('archivo'), createMaterial);
router.put('/:id', upload.single('archivo'), updateMaterial);
router.delete('/:id', deleteMaterial);

// Ruta para obtener materiales por asignatura
router.get('/materia/:id_asignatura', getMaterialesPorAsignatura);

module.exports = router;
