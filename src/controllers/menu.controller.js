// src/controllers/menu.controller.js
const MenuService = require("../services/menu.service");

const MenuController = {
    getAll: async (req, res) => {
        try {
            const menus = await MenuService.listar();
            return res.json(menus);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener menús" });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const menu = await MenuService.obtenerPorId(id);
            if (!menu) {
                return res.status(404).json({ error: "Menú no encontrado" });
            }
            return res.json(menu);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener menú" });
        }
    },
    create: async (req, res) => {
        try {
            const nuevo = await MenuService.crear(req.body);
            return res.status(201).json(nuevo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al crear menú" });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await MenuService.actualizar(id, req.body);
            if (!updated) {
                return res.status(404).json({ error: "Menú no encontrado" });
            }
            return res.json(updated);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al actualizar menú" });
        }
    },
    remove: async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await MenuService.eliminar(id);
            if (!deleted) {
                return res.status(404).json({ error: "Menú no encontrado" });
            }
            return res.json({ message: "Menú eliminado" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al eliminar menú" });
        }
    },
};

module.exports = MenuController;
