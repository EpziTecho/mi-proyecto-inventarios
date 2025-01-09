// src/controllers/rol.controller.js
const RolService = require("../services/rol.service");

const RolController = {
    // GET /api/roles
    getAll: async (req, res) => {
        try {
            const roles = await RolService.listar();
            return res.json(roles);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al obtener roles" });
        }
    },

    // GET /api/roles/:id
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const rol = await RolService.obtenerPorId(id);
            if (!rol) {
                return res
                    .status(404)
                    .json({ error: `Rol con ID ${id} no encontrado` });
            }
            return res.json(rol);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al obtener el rol" });
        }
    },

    // POST /api/roles
    create: async (req, res) => {
        try {
            const nuevoRol = await RolService.crear(req.body);
            return res.status(201).json(nuevoRol);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Error al crear el rol" });
        }
    },

    // PUT /api/roles/:id
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const rolActualizado = await RolService.actualizar(id, req.body);
            if (!rolActualizado) {
                return res
                    .status(404)
                    .json({ error: `Rol con ID ${id} no existe` });
            }
            return res.json(rolActualizado);
        } catch (error) {
            console.error(error);
            return res
                .status(400)
                .json({ error: "Error al actualizar el rol" });
        }
    },

    // DELETE /api/roles/:id
    remove: async (req, res) => {
        try {
            const { id } = req.params;
            const rolEliminado = await RolService.eliminar(id);
            if (!rolEliminado) {
                return res
                    .status(404)
                    .json({ error: `Rol con ID ${id} no existe` });
            }
            return res.json({ message: `Rol ${id} eliminado` });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "Error al eliminar el rol" });
        }
    },
};

module.exports = RolController;
