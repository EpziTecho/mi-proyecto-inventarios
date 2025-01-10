// src/models/sucursal.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Sucursal = sequelize.define(
    "Sucursal",
    {
        idSucursal: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        Direccion: {
            type: DataTypes.STRING(100),
        },
        Estado: {
            type: DataTypes.STRING(20),
        },
        tfno: {
            type: DataTypes.STRING(20),
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "Sucursal",
        timestamps: false, // Manejo manual de timestamps
    }
);

module.exports = Sucursal;
