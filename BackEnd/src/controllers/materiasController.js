const Asignatura = require('../models/Asignatura');
const Docente = require('../models/Docente');
const Docente_asignatura = require('../models/DocenteAsignatura');

// Para obtener todos las materias de los estudiantes
// const Estudiante_asignatura = require('../models/EstudianteAsignatura');


const { Estudiante_asignatura, User, Estudiante } = require('../models');


// Obtener todas las materias de un docente
exports.getMateriasByDocente = async (req, res) => {
    try {
        const id_usuario = req.user.id; // ID del usuario logueado

        // Encontrar el ID del docente a partir del usuario
        const docente = await Docente.findOne({ where: { id_usuario } });
        if (!docente) return res.status(404).json({ message: 'Docente no encontrado' });

        // Obtener las materias relacionadas con el docente
        const materias = await Docente_asignatura.findAll({
            where: { id_docente: docente.id },
            include: [
                {
                    model: Asignatura,
                    as: 'Asignatura', // Este alias debe coincidir con el definido en las asociaciones
                    attributes: ['id', 'nombre', 'descripcion', 'sigla', 'curso', 'creditos'],
                },
            ],
        });

        res.status(200).json({ materias });
    } catch (error) {
        console.error('Error al obtener las materias:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};





exports.getEstudiantesByAsignatura = async (req, res) => {
    const { id_asignatura } = req.params;

    try {
        const estudianteAsignaturas = await Estudiante_asignatura.findAll({
            where: { id_asignatura },
            include: [
                {
                    model: Estudiante,
                    as: 'Estudiante',
                    include: [
                        {
                            model: User,
                            as: 'User',
                            attributes: ['nombre', 'apellido', 'email', 'ci', 'telefono'],
                        },
                    ],
                },
            ],
        });

        const estudiantes = estudianteAsignaturas.map((relacion) => {
            const estudiante = relacion.Estudiante;
            const usuario = estudiante.User;

            return {
                id_estudiante: estudiante.id,
                matricula: estudiante.matricula,
                carrera: estudiante.carrera,
                cu: estudiante.cu,
                fecha_ingreso: estudiante.fecha_ingreso,
                usuario: {
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    ci: usuario.ci,
                    telefono: usuario.telefono,
                },
            };
        });

        res.json(estudiantes);
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
};





// Obtener información de un estudiante específico

exports.getEstudiante = async (req, res) => {
    const { id_estudiante } = req.params;

    try {
        const estudiante = await Estudiante.findByPk(id_estudiante, {
            include: [
                {
                    model: User,
                    as: 'User',
                    attributes: ['nombre', 'apellido', 'email', 'ci', 'telefono'],
                },
            ],
        });

        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        if (!estudiante.User) {
            return res.status(404).json({ error: 'Usuario asociado no encontrado' });
        }

        res.json({
            id: estudiante.id,
            matricula: estudiante.matricula,
            carrera: estudiante.carrera,
            cu: estudiante.cu,
            fecha_ingreso: estudiante.fecha_ingreso,
            usuario: {
                nombre: estudiante.User.nombre,
                apellido: estudiante.User.apellido,
                email: estudiante.User.email,
                ci: estudiante.User.ci,
                telefono: estudiante.User.telefono,
            },
        });
    } catch (error) {
        console.error('Error al obtener estudiante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};





// Eliminar estudiante de una asignatura
exports.removeEstudianteFromAsignatura = async (req, res) => {
    const { id_estudiante, id_asignatura } = req.params;

    try {
        const relacion = await Estudiante_asignatura.findOne({
            where: { id_estudiante, id_asignatura },
        });

        if (!relacion) {
            return res.status(404).json({ error: 'El estudiante no está inscrito en esta asignatura' });
        }

        await relacion.destroy();

        res.json({ message: 'Estudiante eliminado de la asignatura correctamente' });
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};




// Contactar estudiante
exports.contactEstudiante = async (req, res) => {
    const { id_estudiante, id_asignatura } = req.params; // id_asignatura en la URL
    const { message } = req.body;

    if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'El mensaje no puede estar vacío' });
    }

    try {
        // Verificar si el estudiante está inscrito en la asignatura
        const relacion = await Estudiante_asignatura.findOne({
            where: { id_estudiante, id_asignatura },
        });

        if (!relacion) {
            return res.status(403).json({ error: 'El estudiante no está inscrito en esta asignatura para contactarle.' });
        }

        // Buscar la información del estudiante y su usuario
        const estudiante = await Estudiante.findByPk(id_estudiante, {
            include: [{ model: User, as: 'User', attributes: ['email', 'nombre'] }],
        });

        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        if (!estudiante.User) {
            return res.status(404).json({ error: 'Usuario asociado no encontrado' });
        }

        // Simulación del envío de mensaje
        console.log(`Mensaje enviado a ${estudiante.User.email}: ${message}`);
        res.json({ message: `Mensaje enviado a ${estudiante.User.nombre}: ${message}` });
    } catch (error) {
        console.error('Error al contactar estudiante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};







// Obtener todos las materias
exports.getMateriasByEstudiante = async (req, res) => {
    try {
        const id_usuario = req.user.id; // ID del usuario logueado

        // Encontrar el estudiante asociado al usuario
        const estudiante = await Estudiante.findOne({ where: { id_usuario } });

        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        // Obtener las materias relacionadas con el estudiante
        const materias = await Estudiante_asignatura.findAll({
            where: { id_estudiante: estudiante.id },
            include: [
                {
                    model: Asignatura,
                    as: 'Asignatura',
                    attributes: ['id', 'nombre', 'descripcion', 'sigla', 'curso', 'creditos'],
                },
            ],
        });

        // Transformar los datos
        const resultado = materias.map((relacion) => relacion.Asignatura);

        res.json(resultado);
    } catch (error) {
        console.error('Error al obtener las materias del estudiante:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
