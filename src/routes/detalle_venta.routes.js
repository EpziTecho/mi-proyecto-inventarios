// src/routes/detalle_venta.routes.js
const { Router } = require("express");
const DetalleVentaController = require("../controllers/detalle_venta.controller");

const router = Router();

router.get("/", DetalleVentaController.getAll);
router.get("/:idVenta", DetalleVentaController.getByVentaId);
router.post("/", DetalleVentaController.create);
router.put("/:idVenta/:idProducto", DetalleVentaController.update);
router.delete("/:idVenta/:idProducto", DetalleVentaController.remove);

module.exports = router;
