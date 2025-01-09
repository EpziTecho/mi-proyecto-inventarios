// src/models/index.js
const sequelize = require("../config/database");
const Rol = require("./rol.model");
const Menu = require("./menu.model");
const Vendedor = require("./vendedor.model");
const RolMenu = require("./rol_menu.model");

// Rol y Menu tienen N:M via Rol_menu
Rol.belongsToMany(Menu, {
    through: RolMenu,
    foreignKey: "idRol",
    otherKey: "idmenu",
});
Menu.belongsToMany(Rol, {
    through: RolMenu,
    foreignKey: "idmenu",
    otherKey: "idRol",
});

// Vendedor -- belongsTo --> Rol  (1:N)
Vendedor.belongsTo(Rol, {
    foreignKey: "idRol",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
});
Rol.hasMany(Vendedor, {
    foreignKey: "idRol",
});

// Exportar instancia y modelos
module.exports = {
    sequelize,
    Rol,
    Menu,
    Vendedor,
    RolMenu,
};
