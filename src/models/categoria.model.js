// src/models/categoria.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Categoria = sequelize.define(
    "Categoria",
    {
        idCategoria: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombreCategoria: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        descripcionCategoria: {
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
        tableName: "Categoria",
        timestamps: false, // Desactivamos el manejo automático de timestamps
    }
);

module.exports = Categoria;
