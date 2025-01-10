// src/repositories/rol.repository.js
const { Rol } = require("../models");

const RolRepository = {
    getAll: async () => {
        return await Rol.findAll();
    },

    getById: async (idRol) => {
        return await Rol.findByPk(idRol);
    },

    create: async (nombreRol, descripcionRol) => {
        return await Rol.create({ nombreRol, descripcionRol });
    },

    update: async (idRol, data) => {
        const rol = await Rol.findByPk(idRol);
        if (!rol) return null;
        await rol.update(data);
        return rol;
    },

    delete: async (idRol) => {
        const rol = await Rol.findByPk(idRol);
        if (!rol) return null;
        await rol.destroy();
        return rol;
    },
};

module.exports = RolRepository;
