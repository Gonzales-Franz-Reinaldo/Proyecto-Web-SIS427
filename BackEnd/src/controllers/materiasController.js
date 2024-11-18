const Asignatura = require('../models/Asignatura');
const Docente = require('../models/Docente');
const Docente_asignatura = require('../models/DocenteAsignatura');
const User = require('../models/User');

// Obtener todas las materias de un docente
exports.getMateriasByDocente = async (req, res) => {
    try {
        // console.log('Usuario:', req.user.id);
        
        const id_usuario  = req.user.id; // ID del usuario logueado

        // Encontrar el ID del docente a partir del usuario
        const docente = await Docente.findOne({ where: { id_usuario } });
        if (!docente) return res.status(404).json({ message: 'Docente no encontrado' });
    
        // console.log('Id usuario', id_usuario);
        // console.log('Id docente', docente.id);

        // Obtener las materias relacionadas con el docente
        const materias = await Docente_asignatura.findAll({
            where: { id_docente: docente.id },
            include: [
                {
                    model: Asignatura,
                    attributes: ['id', 'nombre', 'descripcion', 'sigla', 'curso', 'creditos'],
                },
            ],
        });

        res.status(200).json({ materias });
        // res.status(200).json({ id_usuario, id_docente: docente.id });
    } catch (error) {
        console.error('Error al obtener las materias:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
