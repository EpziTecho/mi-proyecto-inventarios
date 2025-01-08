const RolMenuRepository = require("../repositories/rolMenu.repository");
const RolRepository = require("../repositories/rol.repository");
const MenuRepository = require("../repositories/menu.repository");

const RolMenuService = {
    obtenerMenusDeRol: async (idRol) => {
        // Verificar que el rol exista
        const rol = await RolRepository.getById(idRol);
        if (!rol) {
            throw new Error(`Rol con ID ${idRol} no existe`);
        }
        return await RolMenuRepository.getMenusByRol(idRol);
    },

    agregarMenuARol: async (idRol, idmenu) => {
        // Verificar rol
        const rol = await RolRepository.getById(idRol);
        if (!rol) {
            throw new Error(`Rol con ID ${idRol} no existe`);
        }
        // Verificar menu
        const menu = await MenuRepository.getById(idmenu);
        if (!menu) {
            throw new Error(`Menu con ID ${idmenu} no existe`);
        }
        await RolMenuRepository.addMenuToRol(idRol, idmenu);
        return { message: `Menu ${idmenu} asociado al Rol ${idRol}` };
    },

    eliminarMenuDeRol: async (idRol, idmenu) => {
        await RolMenuRepository.removeMenuFromRol(idRol, idmenu);
        return { message: `Menu ${idmenu} eliminado del Rol ${idRol}` };
    },
};

module.exports = RolMenuService;
