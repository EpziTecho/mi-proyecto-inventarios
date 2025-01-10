// src/repositories/rolMenu.repository.js
const { RolMenu } = require("../models");

const RolMenuRepository = {
    getMenusByRol: async (idRol) => {
        return await RolMenu.findAll({ where: { idRol } });
    },

    addMenuToRol: async (idRol, idMenu) => {
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
