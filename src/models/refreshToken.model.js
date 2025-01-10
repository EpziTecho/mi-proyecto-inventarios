// src/models/refreshToken.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Vendedor = require("./vendedor.model");

const RefreshToken = sequelize.define(
    "RefreshToken",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tokenHash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "RefreshToken",
        timestamps: false,
    }
);

RefreshToken.belongsTo(Vendedor, { foreignKey: "vendedorId" });
Vendedor.hasMany(RefreshToken, { foreignKey: "vendedorId" });

module.exports = RefreshToken;
