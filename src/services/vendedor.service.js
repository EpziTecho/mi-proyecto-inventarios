// src/services/vendedor.service.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const VendedorRepository = require("../repositories/vendedor.repository");

const VendedorService = {
    listar: async () => {
        return await VendedorRepository.getAll();
    },

    obtenerPorId: async (idVendedor) => {
        const vendedor = await VendedorRepository.getById(idVendedor);
        if (!vendedor)
            throw new Error(`Vendedor con ID ${idVendedor} no encontrado`);
        return vendedor;
    },

    crear: async (data, creatorId) => {
        const { password, ...vendedorData } = data;
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        vendedorData.createdBy = creatorId; // Asignar creador
        return await VendedorRepository.create({
            ...vendedorData,
            passwordHash,
        });
    },

    actualizar: async (idVendedor, data, updaterId) => {
        if (data.password) {
            const salt = await bcrypt.genSalt(10);
            data.passwordHash = await bcrypt.hash(data.password, salt);
            delete data.password;
        }
        data.updatedBy = updaterId; // Asignar el usuario que actualiza

        const actualizado = await VendedorRepository.update(idVendedor, data);
        if (!actualizado)
            throw new Error(`Vendedor con ID ${idVendedor} no existe`);
        return actualizado;
    },

    eliminar: async (idVendedor) => {
        const borrado = await VendedorRepository.delete(idVendedor);
        if (!borrado)
            throw new Error(`Vendedor con ID ${idVendedor} no existe`);
        return borrado;
    },

    login: async (username, password) => {
        const vendedor = await VendedorRepository.findByUsername(username);
        if (!vendedor) throw new Error("Usuario no encontrado");

        const match = await bcrypt.compare(password, vendedor.passwordHash);
        if (!match) throw new Error("Contraseña incorrecta");

        const token = jwt.sign(
            {
                id: vendedor.idVendedor,
                username: vendedor.username,
                role: vendedor.idRol,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        vendedor.lastLogin = new Date();
        await vendedor.save();

        return { token };
    },
};

module.exports = VendedorService;
