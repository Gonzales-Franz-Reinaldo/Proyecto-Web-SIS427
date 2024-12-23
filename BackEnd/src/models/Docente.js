const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Docente = sequelize.define('Docente', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    especialidad: { type: DataTypes.STRING, allowNull: false },
    nivel_academico: { type: DataTypes.STRING, allowNull: false },
    experiencia: { type: DataTypes.INTEGER, allowNull: false },
    categoria: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'docentes',
    timestamps: false,
});


module.exports = Docente;
