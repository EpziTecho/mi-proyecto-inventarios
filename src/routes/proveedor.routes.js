// src/routes/proveedor.routes.js
const { Router } = require("express");
const ProveedorController = require("../controllers/proveedor.controller");

const router = Router();

router.get("/", ProveedorController.getAll);
router.get("/:id", ProveedorController.getById);
router.post("/", ProveedorController.create);
router.put("/:id", ProveedorController.update);
router.delete("/:id", ProveedorController.remove);

module.exports = router;
