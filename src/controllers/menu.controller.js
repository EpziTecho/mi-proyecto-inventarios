const MenuService = require("../services/menu.service");

const MenuController = {
    getAll: async (req, res) => {
        try {
            const menus = await MenuService.listar();
            return res.json(menus);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al obtener menus" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const menu = await MenuService.obtenerPorId(id);
            return res.json(menu);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const nuevoMenu = await MenuService.crear(req.body);
            return res.status(201).json(nuevoMenu);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await MenuService.actualizar(id, req.body);
            return res.json(updated);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await MenuService.eliminar(id);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },
};

module.exports = MenuController;
