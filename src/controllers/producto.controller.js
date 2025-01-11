// src/controllers/producto.controller.js
const ProductoService = require("../services/producto.service");

const ProductoController = {
    getAll: async (req, res) => {
        try {
            const productos = await ProductoService.listar();
            res.json(productos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al obtener productos" });
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const producto = await ProductoService.obtenerPorId(id);
            res.json(producto);
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const creatorId = req.user ? req.user.id : null; // Si usas autenticación
            const nuevoProducto = await ProductoService.crear(
                req.body,
                creatorId
            );
            res.status(201).json(nuevoProducto);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const updaterId = req.user ? req.user.id : null; // Si usas autenticación
            const actualizado = await ProductoService.actualizar(
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
            await ProductoService.eliminar(id);
            res.json({ message: `Producto ${id} eliminado` });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: error.message });
        }
    },
};

module.exports = ProductoController;
