// src/controllers/auth.controller.js
const AuthService = require("../services/auth.service");

const AuthController = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const tokens = await AuthService.login(username, password);
            res.json(tokens); // { accessToken, refreshToken }
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: error.message });
        }
    },

    refresh: async (req, res) => {
        try {
            const { refreshToken } = req.body;
            const tokens = await AuthService.refresh(refreshToken);
            res.json(tokens); // { accessToken, refreshToken }
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: error.message });
        }
    },

    logout: async (req, res) => {
        try {
            const userId = req.user ? req.user.id : null;
            if (!userId)
                return res
                    .status(400)
                    .json({ error: "Usuario no autenticado" });
            await AuthService.logout(userId);
            res.json({ message: "Sesión cerrada correctamente" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = AuthController;
