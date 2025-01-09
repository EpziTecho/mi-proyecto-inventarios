const RolMenuRepository = require("../repositories/rolMenu.repository");

const RolMenuService = {
    obtenerMenusDeRol: async (idRol) => {
        // Podrías usar RolMenuRepository.getMenusByRol(idRol)
        // o, si lo implementaste así, Rol.findByPk(idRol, { include: Menu })
        const menus = await RolMenuRepository.getMenusByRol(idRol);
        return menus;
    },

    agregarMenuARol: async (idRol, idMenu) => {
        // Insertar en la tabla pivote Rol_menu
        return await RolMenuRepository.addMenuToRol(idRol, idMenu);
    },

    eliminarMenuDeRol: async (idRol, idMenu) => {
        // Eliminar la asociación N:M
        const result = await RolMenuRepository.removeMenuFromRol(idRol, idMenu);
        if (!result) {
            throw new Error(
                `No se encontró la asociación rol:${idRol}, menu:${idMenu}`
            );
        }
        return true;
    },
};

module.exports = RolMenuService;
