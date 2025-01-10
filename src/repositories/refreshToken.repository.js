// src/repositories/refreshToken.repository.js
const RefreshToken = require("../models/refreshToken.model");

const RefreshTokenRepository = {
    create: async (data) => {
        return await RefreshToken.create(data);
    },
    findAll: async () => {
        return await RefreshToken.findAll();
    },
    delete: async (id) => {
        const token = await RefreshToken.findByPk(id);
        if (!token) return null;
        await token.destroy();
        return token;
    },
    deleteByUserId: async (vendedorId) => {
        return await RefreshToken.destroy({ where: { vendedorId } });
    },
};

module.exports = RefreshTokenRepository;
