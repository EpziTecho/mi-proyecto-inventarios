const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Rol = require("./rol.model");

const Vendedor = sequelize.define(
    "Vendedor",
    {
        idVendedor: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dni: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true, // Validación a nivel de base de datos
        },
        tfno: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true, // Validación a nivel de base de datos
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true, // Validación a nivel de base de datos
            validate: {
                isEmail: {
                    msg: "El correo debe tener un formato válido.",
                },
            },
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idRol: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Rol,
                key: "idRol",
            },
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "Vendedor",
        timestamps: false,
    }
);

Vendedor.belongsTo(Rol, { foreignKey: "idRol" });

module.exports = Vendedor;
