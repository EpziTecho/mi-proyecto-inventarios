// src/models/cliente.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Cliente = sequelize.define(
    "Cliente",
    {
        idCliente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        documento: {
            type: DataTypes.STRING(20),
        },
        nombreCliente: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        fechaNacimiento: {
            type: DataTypes.DATE,
        },
        tfno: {
            type: DataTypes.STRING(20),
        },
        fechaRegistro: {
            type: DataTypes.DATE,
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
        tableName: "Cliente",
        timestamps: false,
    }
);

module.exports = Cliente;
