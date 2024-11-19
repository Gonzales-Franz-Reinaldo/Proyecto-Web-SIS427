const Docente = require('./Docente'); 
const Asignatura = require('./Asignatura'); 
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Docente_asignatura = sequelize.define('Docente_asignatura', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_docente: { type: DataTypes.INTEGER, allowNull: false },
    id_asignatura: { type: DataTypes.INTEGER, allowNull: false },
    fecha_asignacion: { type: DataTypes.DATE, allowNull: false },
}, {
    tableName: 'docente_asignatura',
    timestamps: false
});


module.exports = Docente_asignatura;
