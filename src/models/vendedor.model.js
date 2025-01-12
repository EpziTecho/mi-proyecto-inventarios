const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Asegúrate de que esta sea la ruta correcta a tu configuración de Sequelize
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
            type: DataTypes.BLOB("long"), // Campo para almacenar imágenes en formato binario
            allowNull: true,
        },
        dni: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        tfno: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
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

// Configuración de relaciones
Vendedor.belongsTo(Rol, { foreignKey: "idRol" });

module.exports = Vendedor;
