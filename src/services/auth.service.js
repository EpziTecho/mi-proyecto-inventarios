// src/services/auth.service.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const VendedorRepository = require("../repositories/vendedor.repository");
const RefreshTokenRepository = require("../repositories/refreshToken.repository");

const generateAccessToken = (vendedor) => {
    return jwt.sign(
        {
            id: vendedor.idVendedor,
            username: vendedor.username,
            role: vendedor.idRol,
        },
        process.env.JWT_SECRET,
        { expiresIn: "15m" } // Token de acceso con expiración corta
    );
};

const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString("hex");
};

const AuthService = {
    login: async (username, password) => {
        const vendedor = await VendedorRepository.findByUsername(username);
        if (!vendedor) throw new Error("Usuario no encontrado");

        const match = await bcrypt.compare(password, vendedor.passwordHash);
        if (!match) throw new Error("Contraseña incorrecta");

        const accessToken = generateAccessToken(vendedor);
        const refreshTokenRaw = generateRefreshToken();
        const refreshTokenHash = await bcrypt.hash(refreshTokenRaw, 10);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 días de validez para el refresh token

        await RefreshTokenRepository.create({
            tokenHash: refreshTokenHash,
            vendedorId: vendedor.idVendedor,
            expiresAt: expiresAt,
        });

        vendedor.lastLogin = new Date();
        await vendedor.save();

        return { accessToken, refreshToken: refreshTokenRaw };
    },

    refresh: async (oldRefreshToken) => {
        // Obtener todos los refresh tokens (en una implementación real, usarías una mejor búsqueda)
        const allTokens = await RefreshTokenRepository.findAll();
        let matchedToken = null;
        for (const tokenEntry of allTokens) {
            const isMatch = await bcrypt.compare(
                oldRefreshToken,
                tokenEntry.tokenHash
            );
            if (isMatch) {
                matchedToken = tokenEntry;
                break;
            }
        }
        if (!matchedToken) throw new Error("Refresh token inválido");

        if (new Date(matchedToken.expiresAt) < new Date()) {
            await RefreshTokenRepository.delete(matchedToken.id);
            throw new Error("Refresh token expirado");
        }

        const vendedor = await VendedorRepository.getById(
            matchedToken.vendedorId
        );
        if (!vendedor) throw new Error("Usuario asociado no encontrado");

        const accessToken = generateAccessToken(vendedor);
        const newRefreshTokenRaw = generateRefreshToken();
        const newRefreshTokenHash = await bcrypt.hash(newRefreshTokenRaw, 10);
        const newExpiresAt = new Date();
        newExpiresAt.setDate(newExpiresAt.getDate() + 7);

        matchedToken.tokenHash = newRefreshTokenHash;
        matchedToken.expiresAt = newExpiresAt;
        await matchedToken.save();

        return { accessToken, refreshToken: newRefreshTokenRaw };
    },

    logout: async (vendedorId) => {
        await RefreshTokenRepository.deleteByUserId(vendedorId);
        return true;
    },
};

module.exports = AuthService;
