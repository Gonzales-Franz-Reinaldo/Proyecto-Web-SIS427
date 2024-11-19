

const sequelize = require('../config/database');
const User = require('./User');
const Estudiante = require('./Estudiante');
const Asignatura = require('./Asignatura');
const Estudiante_asignatura = require('./EstudianteAsignatura');
const Docente = require('./Docente');
const Docente_asignatura = require('./DocenteAsignatura');

// Relaciones: Usuario y Estudiante
User.hasOne(Estudiante, { foreignKey: 'id_usuario', as: 'estudiante' });
Estudiante.belongsTo(User, { foreignKey: 'id_usuario', as: 'User' });

// Relaciones: Estudiante y Asignatura a través de Estudiante_asignatura
Estudiante.hasMany(Estudiante_asignatura, { foreignKey: 'id_estudiante', as: 'asignaturas' });
Estudiante_asignatura.belongsTo(Estudiante, { foreignKey: 'id_estudiante', as: 'Estudiante' });

Asignatura.hasMany(Estudiante_asignatura, { foreignKey: 'id_asignatura', as: 'estudiantes' });
Estudiante_asignatura.belongsTo(Asignatura, { foreignKey: 'id_asignatura', as: 'Asignatura' });

// Relaciones: Docente y Asignatura a través de Docente_asignatura
Docente.hasMany(Docente_asignatura, { foreignKey: 'id_docente', as: 'Asignaturas' });
Docente_asignatura.belongsTo(Docente, { foreignKey: 'id_docente', as: 'Docente' });

Asignatura.hasMany(Docente_asignatura, { foreignKey: 'id_asignatura', as: 'Docentes' });
Docente_asignatura.belongsTo(Asignatura, { foreignKey: 'id_asignatura', as: 'Asignatura' });

module.exports = { 
    sequelize, 
    User, 
    Estudiante, 
    Asignatura, 
    Estudiante_asignatura, 
    Docente, 
    Docente_asignatura 
};
