const Docente = require('./Docente'); // Importa el modelo Docente
const Asignatura = require('./Asignatura'); // Importa el modelo Asignatura

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa tu instancia de Sequelize

const Docente_asignatura = sequelize.define('Docente_asignatura', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_docente: { type: DataTypes.INTEGER, allowNull: false },
    id_asignatura: { type: DataTypes.INTEGER, allowNull: false },
    fecha_asignacion: { type: DataTypes.DATE, allowNull: false },
}, {
    tableName: 'docente_asignatura',
    timestamps: false
});

// Asociaciones
Docente_asignatura.belongsTo(Docente, { foreignKey: 'id_docente' });
Docente_asignatura.belongsTo(Asignatura, { foreignKey: 'id_asignatura' });

Docente.hasMany(Docente_asignatura, { foreignKey: 'id_docente' });
Asignatura.hasMany(Docente_asignatura, { foreignKey: 'id_asignatura' });

module.exports = Docente_asignatura;
