const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asignatura = sequelize.define(
    'Asignatura',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING, allowNull: false },
        descripcion: { type: DataTypes.STRING, allowNull: false },
        sigla: { type: DataTypes.STRING, allowNull: false },
        curso: { type: DataTypes.INTEGER, allowNull: false },
        creditos: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        tableName: 'asignatura',
        timestamps: false,
    }
);

module.exports = Asignatura;
