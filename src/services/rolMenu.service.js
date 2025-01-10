// src/services/rolMenu.service.js
const RolMenuRepository = require("../repositories/rolMenu.repository");

const RolMenuService = {
    obtenerMenusDeRol: async (idRol) => {
        return await RolMenuRepository.getMenusByRol(idRol);
    },

    agregarMenuARol: async (idRol, idMenu) => {
        return await RolMenuRepository.addMenuToRol(idRol, idMenu);
    },

    eliminarMenuDeRol: async (idRol, idMenu) => {
        const result = await RolMenuRepository.removeMenuFromRol(idRol, idMenu);
        if (!result)
            throw new Error(
                `No se encontró asociación entre Rol ${idRol} y Menu ${idMenu}`
            );
        return result;
    },
};

module.exports = RolMenuService;
