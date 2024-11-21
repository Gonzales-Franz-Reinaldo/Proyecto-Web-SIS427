const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Opcion = sequelize.define('Opcion', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_pregunta: { type: DataTypes.INTEGER, allowNull: false }, // Referencia a Preguntas
    texto: { type: DataTypes.TEXT, allowNull: false },
    es_correcta: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
    tableName: 'opciones',
    timestamps: false,
});

module.exports = Opcion;
