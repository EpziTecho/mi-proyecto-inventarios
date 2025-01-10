// src/controllers/sucursal.controller.js
const SucursalService = require("../services/sucursal.service");

const SucursalController = {
    getAll: async (req, res) => {
        try {
            const sucursales = await SucursalService.listar();
            res.json(sucursales);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener sucursales" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const sucursal = await SucursalService.obtenerPorId(id);
            res.json(sucursal);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const creatorId = req.user ? req.user.id : null; // Suponiendo middleware de autenticación
            const nuevaSucursal = await SucursalService.crear(
                req.body,
                creatorId
            );
            res.status(201).json(nuevaSucursal);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updaterId = req.user ? req.user.id : null; // Suponiendo middleware de autenticación
            const actualizada = await SucursalService.actualizar(
                id,
                req.body,
                updaterId
            );
            res.json(actualizada);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { id } = req.params;
            await SucursalService.eliminar(id);
            res.json({ message: `Sucursal ${id} eliminada` });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = SucursalController;
