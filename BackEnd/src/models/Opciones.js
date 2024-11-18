const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Opciones = sequelize.define('Opciones', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_pregunta: { type: DataTypes.INTEGER, allowNull: false },
    texto: { type: DataTypes.STRING, allowNull: false },
    es_correcta: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    tableName: 'opciones',
    timestamps: false
});

module.exports = Opciones;
