const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estudiante_asignatura = sequelize.define(
    'Estudiante_asignatura',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_estudiante: { type: DataTypes.INTEGER, allowNull: false },
        id_asignatura: { type: DataTypes.INTEGER, allowNull: false },
        fecha_inscripcion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
        tableName: 'estudiante_asignatura',
        timestamps: false,
    }
);

module.exports = Estudiante_asignatura;
