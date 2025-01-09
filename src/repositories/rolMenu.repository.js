// src/repositories/rolMenu.repository.js
const { RolMenu, Rol, Menu } = require("../models");

const RolMenuRepository = {
    // Obtener menús por rol usando la tabla pivote
    getMenusByRol: async (idRol) => {
        // Alternativa 1: usar directly RolMenu
        const rows = await RolMenu.findAll({
            where: { idRol },
        });
        return rows; // Tendrías que mapear IDs para luego fetch de Menu, etc.

        /*
      Alternativa 2: usar Rol.findByPk(idRol, { include: Menu })
      y Sequelize se encarga de la relación N:M
    */
    },

    addMenuToRol: async (idRol, idMenu) => {
        // Insertar en la tabla pivote
        return await RolMenu.create({ idRol, idmenu: idMenu });
    },

    removeMenuFromRol: async (idRol, idMenu) => {
        const rolMenu = await RolMenu.findOne({
            where: { idRol, idmenu: idMenu },
        });
        if (rolMenu) {
            await rolMenu.destroy();
            return true;
        }
        return false;
    },
};

module.exports = RolMenuRepository;
