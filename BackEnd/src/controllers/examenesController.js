const Examenes = require('../models/Examenes');

const ResultadoExamen = require('../models/ResultadoExamen');

exports.createExamen = async (req, res) => {
    try {
        const { titulo, descripcion, id_asignatura, fecha_publicacion, fecha_entrega, puntuacion_total, duracion } = req.body;
        const examen = await Examenes.create({
            titulo,
            descripcion,
            id_asignatura,
            fecha_publicacion,
            fecha_entrega,
            puntuacion_total,
            duracion
        });
        res.status(201).json(examen);
    } catch (error) {
        console.error('Error al crear examen:', error);
        res.status(500).json({ message: 'Error al crear examen' });
    }
};

exports.getExamenesByAsignatura = async (req, res) => {
    try {
        const { id_asignatura } = req.params;
        const examenes = await Examenes.findAll({ where: { id_asignatura } });
        res.status(200).json(examenes);
    } catch (error) {
        console.error('Error al obtener examenes:', error);
        res.status(500).json({ message: 'Error al obtener examenes' });
    }
};


exports.updateExamen = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, id_asignatura, fecha_publicacion, fecha_entrega, duracion } = req.body;

        // Verificar si el examen existe
        const examen = await Examenes.findOne({ where: { id } });
        if (!examen) {
            return res.status(404).json({ message: 'No existe un registro de examen con ese ID' });
        }

        await Examenes.update(
            { titulo, descripcion, id_asignatura, fecha_publicacion, fecha_entrega, duracion },
            { where: { id } }
        );

        res.status(200).json({ message: 'Examen actualizado' });
    } catch (error) {
        console.error('Error al actualizar el examen:', error);
        res.status(500).json({ message: 'Error al actualizar el examen' });
    }
}



exports.deleteExamen = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si el examen existe
        const examen = await Examenes.findOne({ where: { id } });
        if (!examen) {
            return res.status(404).json({ message: 'No existe un registro de examen con ese ID' });
        }

        await Examenes.destroy({ where: { id } });
        res.status(200).json({ message: 'Examen eliminado' });
    } catch (error) {
        console.error('Error al eliminar el examen:', error);
        res.status(500).json({ message: 'Error al eliminar el examen' });
    }
}



exports.publicarExamen = async (req, res) => {
    try {
        const { id } = req.params;
        const examen = await Examenes.findByPk(id);
        if (!examen) {
            return res.status(404).json({ message: 'Examen no encontrado' });
        }

        examen.estado = 'publicado';
        await examen.save();

        res.status(200).json(examen);
    } catch (error) {
        console.error('Error al publicar el examen:', error);
        res.status(500).json({ message: 'Error al publicar el examen' });
    }
};










// PARA EL LADO DEL ESTUDIANTE


// Obtener exámenes publicados por materia
exports.getExamenesPorAsignatura = async (req, res) => {
    const { idAsignatura } = req.params;
    try {
        const examenes = await Examenes.findAll({
            where: { id_asignatura: idAsignatura, estado: 'publicado' },
        });
        res.status(200).json(examenes);
    } catch (error) {
        console.error('Error al obtener exámenes:', error);
        res.status(500).json({ message: 'Error al obtener exámenes' });
    }
};

// Iniciar examen
exports.iniciarExamen = async (req, res) => {
    const { idExamen, idEstudiante } = req.body;
    try {
        const resultado = await ResultadoExamen.create({
            id_examen: idExamen,
            id_estudiante: idEstudiante,
            fecha_inicio: new Date(),
            estado: 'pendiente',
        });
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al iniciar examen:', error);
        res.status(500).json({ message: 'Error al iniciar examen' });
    }
};

// Finalizar examen
exports.finalizarExamen = async (req, res) => {
    const { idExamen, idEstudiante, puntuacionObtenida } = req.body;
    try {
        await ResultadoExamen.update(
            { puntuacion_obtenida: puntuacionObtenida, estado: 'completado', fecha_completado: new Date() },
            { where: { id_examen: idExamen, id_estudiante: idEstudiante } }
        );
        res.status(200).json({ message: 'Examen finalizado correctamente' });
    } catch (error) {
        console.error('Error al finalizar examen:', error);
        res.status(500).json({ message: 'Error al finalizar examen' });
    }
};


// Obtener exámenes disponibles para el estudiante
exports.getExamenesDisponibles = async (req, res) => {
    const { idAsignatura, idEstudiante } = req.params;

    try {
        const examenes = await Examenes.findAll({
            where: { id_asignatura: idAsignatura, estado: 'publicado' },
        });

        const resultados = await ResultadoExamen.findAll({
            where: { id_estudiante: idEstudiante },
        });

        const examenesConEstado = examenes.map((examen) => {
            const resultado = resultados.find(
                (r) => r.id_examen === examen.id && r.id_estudiante === parseInt(idEstudiante)
            );
            return {
                ...examen.dataValues,
                resuelto: !!resultado,
            };
        });

        res.status(200).json(examenesConEstado);
    } catch (error) {
        console.error('Error al listar exámenes:', error);
        res.status(500).json({ message: 'Error al listar exámenes' });
    }
};