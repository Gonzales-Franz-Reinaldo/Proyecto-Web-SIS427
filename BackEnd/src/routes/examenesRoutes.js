const express = require('express');
const { createExamen, getExamenesByAsignatura, updateExamen, deleteExamen, publicarExamen,
    getExamenesPorAsignatura, iniciarExamen, finalizarExamen, getExamenesDisponibles
} = require('../controllers/examenesController');


const { getPreguntasByExamen } = require('../controllers/preguntasController');
const { guardarRespuestas } = require('../controllers/respuestasEstudiantesController');
const { getResultados } = require('../controllers/resultadosExamenesController');
const { getPreguntas_Examen} = require('../controllers/preguntasController');

const router = express.Router();

router.post('/', createExamen);
router.get('/asignatura/:id_asignatura', getExamenesByAsignatura);
router.put('/:id', updateExamen);
router.delete('/:id', deleteExamen);
router.patch('/:id/publicar', publicarExamen);


// Estudiante
router.get('/materia/:idAsignatura', getExamenesPorAsignatura);
router.post('/iniciar', iniciarExamen);
router.post('/finalizar', finalizarExamen);



router.get('/materia/:idAsignatura/estudiante/:idEstudiante', getExamenesDisponibles);
router.get('/:idExamen/preguntas', getPreguntasByExamen);
router.get('/:idExamen/pregunta', getPreguntas_Examen);
router.post('/respuestas', guardarRespuestas);
// router.post('/finalizar', finalizarExamen);
router.get('/:idExamen/estudiante/:idEstudiante/resultados', getResultados);

module.exports = router;
