// src/repositories/vendedor.repository.js
const { Vendedor, Rol } = require("../models");

const VendedorRepository = {
    getAll: async () => {
        // Si quieres traer también los datos del Rol, usa "include"
        return await Vendedor.findAll({
            include: [
                {
                    model: Rol, // Asumes que Vendedor belongsTo(Rol)
                    attributes: ["idRol", "nombreRol"],
                },
            ],
        });
    },

    getById: async (idVendedor) => {
        return await Vendedor.findByPk(idVendedor, {
            include: [
                {
                    model: Rol,
                    attributes: ["idRol", "nombreRol"],
                },
            ],
        });
    },

    create: async (data) => {
        // data = { nombre, foto, dni, tfno, idRol }
        return await Vendedor.create(data);
    },

    update: async (idVendedor, data) => {
        // Ej: { nombre, foto, dni, tfno, idRol }
        const vendedor = await Vendedor.findByPk(idVendedor);
        if (!vendedor) return null;
        await vendedor.update(data);
        return vendedor;
    },

    delete: async (idVendedor) => {
        const vendedor = await Vendedor.findByPk(idVendedor);
        if (!vendedor) return null;
        await vendedor.destroy();
        return vendedor;
    },
};

module.exports = VendedorRepository;
