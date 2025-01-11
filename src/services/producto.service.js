// src/services/producto.service.js
const ProductoRepository = require("../repositories/producto.repository");

const ProductoService = {
    listar: async () => {
        return await ProductoRepository.getAll();
    },

    obtenerPorId: async (idProducto) => {
        const producto = await ProductoRepository.getById(idProducto);
        if (!producto)
            throw new Error(`Producto con ID ${idProducto} no encontrado`);
        return producto;
    },

    crear: async (data, creatorId) => {
        data.createdBy = creatorId || null;
        return await ProductoRepository.create(data);
    },

    actualizar: async (idProducto, data, updaterId) => {
        const existente = await ProductoRepository.getById(idProducto);
        if (!existente)
            throw new Error(`Producto con ID ${idProducto} no existe`);
        data.updatedBy = updaterId || null;
        return await ProductoRepository.update(idProducto, data);
    },

    eliminar: async (idProducto) => {
        const existente = await ProductoRepository.getById(idProducto);
        if (!existente)
            throw new Error(`Producto con ID ${idProducto} no existe`);
        return await ProductoRepository.delete(idProducto);
    },
};

module.exports = ProductoService;
