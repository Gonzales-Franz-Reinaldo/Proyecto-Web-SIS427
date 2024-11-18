const express = require('express');
const { createPregunta, getPreguntasByExamen, getPreguntaById, updatePregunta, deletePregunta } = require('../controllers/preguntasController');

const router = express.Router();

router.post('/', createPregunta);
router.get('/examen/:id_examen', getPreguntasByExamen);
router.get('/:id', getPreguntaById);
router.put('/:id', updatePregunta);
router.delete('/:id', deletePregunta);

module.exports = router;
