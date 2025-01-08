const RolService = require("../services/rol.service");

const RolController = {
    getAll: async (req, res) => {
        try {
            const roles = await RolService.listar();
            return res.json(roles);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al obtener roles" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const rol = await RolService.obtenerPorId(id);
            return res.json(rol);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const nuevoRol = await RolService.crear(req.body);
            return res.status(201).json(nuevoRol);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updated = await RolService.actualizar(id, req.body);
            return res.json(updated);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await RolService.eliminar(id);
            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ error: error.message });
        }
    },
};

module.exports = RolController;
