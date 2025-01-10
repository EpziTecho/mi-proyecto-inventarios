// src/controllers/rolMenu.controller.js
const RolMenuService = require("../services/rolMenu.service");

const RolMenuController = {
    getMenusByRol: async (req, res) => {
        try {
            const { idRol } = req.params;
            const menus = await RolMenuService.obtenerMenusDeRol(idRol);
            res.json(menus);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    addMenuToRol: async (req, res) => {
        try {
            const { idRol, idMenu } = req.params;
            const result = await RolMenuService.agregarMenuARol(idRol, idMenu);
            res.status(201).json({ message: "Asociación creada", result });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    removeMenuFromRol: async (req, res) => {
        try {
            const { idRol, idMenu } = req.params;
            await RolMenuService.eliminarMenuDeRol(idRol, idMenu);
            res.json({ message: "Asociación eliminada" });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },
};

module.exports = RolMenuController;
