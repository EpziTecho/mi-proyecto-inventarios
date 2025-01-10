// src/routes/auth.routes.js
const { Router } = require("express");
const VendedorController = require("../controllers/vendedor.controller");

const router = Router();

// Ruta para el login de vendedores
router.post("/login", VendedorController.login);

module.exports = router;
