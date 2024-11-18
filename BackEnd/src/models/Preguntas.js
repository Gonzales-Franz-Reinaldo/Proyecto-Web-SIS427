const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Preguntas = sequelize.define('Preguntas', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_examen: { type: DataTypes.INTEGER, allowNull: false },
    tipo: { type: DataTypes.ENUM('multiple', 'unica', 'falso_verdadero', 'completar'), allowNull: false },
    texto: { type: DataTypes.TEXT, allowNull: false },
    puntuacion: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'preguntas',
    timestamps: false
});

module.exports = Preguntas;
