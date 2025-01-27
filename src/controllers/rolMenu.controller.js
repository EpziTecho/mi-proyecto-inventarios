const RolMenuService = require("../services/rolMenu.service");

const RolMenuController = {
    getMenusByRol: async (req, res) => {
        try {
            const { idRol } = req.params;
            const menus = await RolMenuService.obtenerMenusDeRol(idRol);
            return res.json(menus);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    addMenuToRol: async (req, res) => {
        try {
            const { idRol, idMenu } = req.params; // o desde req.body si prefieres
            const result = await RolMenuService.agregarMenuARol(idRol, idMenu);
            return res.status(201).json(result);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },

    removeMenuFromRol: async (req, res) => {
        try {
            const { idRol, idMenu } = req.params;
            const result = await RolMenuService.eliminarMenuDeRol(
                idRol,
                idMenu
            );
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },
};

module.exports = RolMenuController;
