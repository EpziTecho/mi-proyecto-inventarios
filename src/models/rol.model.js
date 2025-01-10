// src/models/rol.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Rol = sequelize.define(
    "Rol",
    {
        idRol: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreRol: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        descripcionRol: {
            type: DataTypes.STRING(100),
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "Rol",
        timestamps: false,
    }
);

module.exports = Rol;
