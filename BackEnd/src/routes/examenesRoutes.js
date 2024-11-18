const express = require('express');
const { createExamen, getExamenesByAsignatura, updateExamen, deleteExamen } = require('../controllers/examenesController');

const router = express.Router();

router.post('/', createExamen);
router.get('/asignatura/:id_asignatura', getExamenesByAsignatura);
router.put('/:id', updateExamen);
router.delete('/:id', deleteExamen);

module.exports = router;
