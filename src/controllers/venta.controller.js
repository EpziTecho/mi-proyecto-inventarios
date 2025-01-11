// src/controllers/venta.controller.js
const VentaService = require("../services/venta.service");

const VentaController = {
    getAll: async (req, res) => {
        try {
            const ventas = await VentaService.listar();
            res.json(ventas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener ventas" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const venta = await VentaService.obtenerPorId(id);
            res.json(venta);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const { productos, ...ventaData } = req.body; // Extraer productos y datos de la venta
            const creatorId = req.user ? req.user.id : null; // Asume autenticación (opcional)
            const resultado = await VentaService.crear(
                ventaData,
                productos,
                creatorId
            );
            res.status(201).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updaterId = req.user ? req.user.id : null;
            const actualizada = await VentaService.actualizar(
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
            await VentaService.eliminar(id);
            res.json({ message: `Venta ${id} eliminada` });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = VentaController;
