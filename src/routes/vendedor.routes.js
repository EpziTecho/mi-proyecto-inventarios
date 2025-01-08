const { Router } = require("express");
const VendedorController = require("../controllers/vendedor.controller");

const router = Router();

// GET /api/vendedores
router.get("/", VendedorController.getAll);

// GET /api/vendedores/:id
router.get("/:id", VendedorController.getById);

// POST /api/vendedores
router.post("/", VendedorController.create);

// PUT /api/vendedores/:id
router.put("/:id", VendedorController.update);

// DELETE /api/vendedores/:id
router.delete("/:id", VendedorController.remove);

module.exports = router;
