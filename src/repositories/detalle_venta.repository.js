// src/repositories/detalle_venta.repository.js
const DetalleVenta = require("../models/detalle_venta.model");

const DetalleVentaRepository = {
    create: async (data) => {
        return await DetalleVenta.create(data);
    },
};

module.exports = DetalleVentaRepository;
