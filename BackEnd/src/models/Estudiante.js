const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estudiante = sequelize.define('Estudiante', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false },
    matricula: { type: DataTypes.STRING, unique: true, allowNull: false },
    carrera: { type: DataTypes.STRING, allowNull: false },
    cu: { type: DataTypes.STRING, unique: true, allowNull: false },
    fecha_ingreso: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Estudiante;
