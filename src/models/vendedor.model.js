const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Rol = require("./rol.model"); // Para asociar

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
            type: DataTypes.STRING(255),
        },
        dni: {
            type: DataTypes.STRING(20),
        },
        tfno: {
            type: DataTypes.STRING(20),
        },
        // En lugar de "idRol INT NOT NULL" en Sequelize se definirá como asociación
    },
    {
        tableName: "Vendedor",
        timestamps: false,
    }
);

// Asignación de llaves foráneas usando asociaciones (ver el paso 4)
Vendedor.belongsTo(Rol, {
    foreignKey: "idRol",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
Rol.hasMany(Vendedor, {
    foreignKey: "idRol",
});

module.exports = Vendedor;
