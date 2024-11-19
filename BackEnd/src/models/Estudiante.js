const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estudiante = sequelize.define(
    'Estudiante',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        id_usuario: { type: DataTypes.INTEGER, allowNull: false },
        matricula: { type: DataTypes.STRING, allowNull: false },
        carrera: { type: DataTypes.STRING, allowNull: false },
        cu: { type: DataTypes.STRING, allowNull: false },
        fecha_ingreso: { type: DataTypes.DATE, allowNull: false },
    },
    {
        tableName: 'estudiantes',
        timestamps: false,
    }
);



module.exports = Estudiante;
