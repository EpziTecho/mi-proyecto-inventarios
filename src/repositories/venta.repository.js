// src/repositories/venta.repository.js
const Venta = require("../models/venta.model");
const Cliente = require("../models/cliente.model");
const Vendedor = require("../models/vendedor.model");
const Sucursal = require("../models/sucursal.model");

const VentaRepository = {
    getAll: async () => {
        return await Venta.findAll({
            include: [
                {
                    model: Cliente,
                    attributes: ["idCliente", "nombreCliente", "documento"],
                },
                { model: Vendedor, attributes: ["idVendedor", "nombre"] },
                { model: Sucursal, attributes: ["idSucursal", "nombre"] },
            ],
        });
    },

    getById: async (idVenta) => {
        return await Venta.findByPk(idVenta, {
            include: [
                {
                    model: Cliente,
                    attributes: ["idCliente", "nombreCliente", "documento"],
                },
                { model: Vendedor, attributes: ["idVendedor", "nombre"] },
                { model: Sucursal, attributes: ["idSucursal", "nombre"] },
            ],
        });
    },

    create: async (data) => {
        return await Venta.create(data);
    },

    update: async (idVenta, data) => {
        const venta = await Venta.findByPk(idVenta);
        if (!venta) return null;
        await venta.update(data);
        return venta;
    },

    delete: async (idVenta) => {
        const venta = await Venta.findByPk(idVenta);
        if (!venta) return null;
        await venta.destroy();
        return venta;
    },
};

module.exports = VentaRepository;
