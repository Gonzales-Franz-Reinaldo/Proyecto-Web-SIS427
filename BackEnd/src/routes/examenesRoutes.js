const express = require('express');
const { createExamen, getExamenesByAsignatura, updateExamen, deleteExamen, publicarExamen } = require('../controllers/examenesController');

const router = express.Router();

router.post('/', createExamen);
router.get('/asignatura/:id_asignatura', getExamenesByAsignatura);
router.put('/:id', updateExamen);
router.delete('/:id', deleteExamen);
router.patch('/:id/publicar', publicarExamen);

module.exports = router;
