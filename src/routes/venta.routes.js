const { Router } = require("express");
const VentaController = require("../controllers/venta.controller");

const router = Router();

router.get("/", VentaController.getAll);
router.get("/:id", VentaController.getById);
router.post("/", VentaController.create); // Acepta productos y datos de la venta
router.put("/:id", VentaController.update);
router.delete("/:id", VentaController.remove);

module.exports = router;
