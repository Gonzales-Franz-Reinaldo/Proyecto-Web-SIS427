// routes/tareasRoutes.js
const express = require('express');
const { getTareasByAsignatura, createTarea, updateTarea, getTareaById, uploadEntrega, deleteTarea } = require('../controllers/tareasController');
const upload = require('../middlewares/upload');

const router = express.Router();


router.get('/:id_asignatura', getTareasByAsignatura);
router.post('/', upload.single('archivo_docente'), createTarea);

// Ruta para actualizar tarea con archivo
router.put('/tarea/:id', upload.single('archivo_docente'), updateTarea);
router.get('/tarea/:id', getTareaById);
router.delete('/tarea/:id', deleteTarea);


router.post('/entregas', upload.single('archivo_estudiante'), uploadEntrega);

module.exports = router;
