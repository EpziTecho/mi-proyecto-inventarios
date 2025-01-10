// src/routes/auth.routes.js
const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware"); // Asegúrate de esta línea

const router = Router();

router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", authMiddleware, AuthController.logout);

module.exports = router;
