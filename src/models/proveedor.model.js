// src/models/proveedor.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Proveedor = sequelize.define(
    "Proveedor",
    {
        idProveedor: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreProveedor: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        ruc: {
            type: DataTypes.STRING(20),
        },
        descripcionProveedor: {
            type: DataTypes.STRING(255),
        },
        tfno: {
            type: DataTypes.STRING(20),
        },
        correo: {
            type: DataTypes.STRING(100),
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
        tableName: "Proveedor",
        timestamps: false,
    }
);

module.exports = Proveedor;
