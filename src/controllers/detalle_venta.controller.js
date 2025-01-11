// src/controllers/detalle_venta.controller.js
const DetalleVentaService = require("../services/detalle_venta.service");

const DetalleVentaController = {
    getAll: async (req, res) => {
        try {
            const detalles = await DetalleVentaService.listar();
            res.json(detalles);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Error al obtener los detalles de venta",
            });
        }
    },

    getByVentaId: async (req, res) => {
        try {
            const { idVenta } = req.params;
            const detalles = await DetalleVentaService.obtenerPorVentaId(
                idVenta
            );
            res.json(detalles);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const nuevoDetalle = await DetalleVentaService.crear(req.body);
            res.status(201).json(nuevoDetalle);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { idVenta, idProducto } = req.params;
            const actualizado = await DetalleVentaService.actualizar(
                idVenta,
                idProducto,
                req.body
            );
            res.json(actualizado);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    remove: async (req, res) => {
        try {
            const { idVenta, idProducto } = req.params;
            await DetalleVentaService.eliminar(idVenta, idProducto);
            res.json({
                message: `Detalle de venta eliminado (Venta ID: ${idVenta}, Producto ID: ${idProducto})`,
            });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = DetalleVentaController;
