const express = require('express');
const { addOpcion, getOpcionesByPregunta, getOpcionById, updateOpcion, deleteOpcion } = require('../controllers/opcionesController');

const router = express.Router();

router.post('/', addOpcion);
router.get('/pregunta/:id_pregunta', getOpcionesByPregunta);
router.get('/:id', getOpcionById);
router.put('/:id', updateOpcion);
router.delete('/:id', deleteOpcion);

module.exports = router;