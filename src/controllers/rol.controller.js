// src/controllers/rol.controller.js
const RolService = require("../services/rol.service");

const RolController = {
    getAll: async (req, res) => {
        try {
            const roles = await RolService.listar();
            res.json(roles);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener roles" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const rol = await RolService.obtenerPorId(id);
            res.json(rol);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const nuevoRol = await RolService.crear(req.body);
            res.status(201).json(nuevoRol);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const actualizado = await RolService.actualizar(id, req.body);
            res.json(actualizado);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { id } = req.params;
            await RolService.eliminar(id);
            res.json({ message: `Rol ${id} eliminado` });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = RolController;
