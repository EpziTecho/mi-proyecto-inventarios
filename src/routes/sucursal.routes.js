// src/routes/sucursal.routes.js
const { Router } = require("express");
const SucursalController = require("../controllers/sucursal.controller");

const router = Router();

router.get("/", SucursalController.getAll);
router.get("/:id", SucursalController.getById);
router.post("/", SucursalController.create);
router.put("/:id", SucursalController.update);
router.delete("/:id", SucursalController.remove);

module.exports = router;
