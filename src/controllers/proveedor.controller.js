// src/controllers/proveedor.controller.js
const ProveedorService = require("../services/proveedor.service");

const ProveedorController = {
    getAll: async (req, res) => {
        try {
            const proveedores = await ProveedorService.listar();
            res.json(proveedores);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener proveedores" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const proveedor = await ProveedorService.obtenerPorId(id);
            res.json(proveedor);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const creatorId = req.user ? req.user.id : null; // Suponiendo middleware de autenticación
            const nuevoProveedor = await ProveedorService.crear(
                req.body,
                creatorId
            );
            res.status(201).json(nuevoProveedor);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updaterId = req.user ? req.user.id : null; // Suponiendo middleware de autenticación
            const actualizado = await ProveedorService.actualizar(
                id,
                req.body,
                updaterId
            );
            res.json(actualizado);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { id } = req.params;
            await ProveedorService.eliminar(id);
            res.json({ message: `Proveedor ${id} eliminado` });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = ProveedorController;
