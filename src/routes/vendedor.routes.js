const { Router } = require("express");
const VendedorController = require("../controllers/vendedor.controller");

const router = Router();

router.get("/", VendedorController.getAll);

router.get("/:id", VendedorController.getById);
router.post("/", VendedorController.create);
router.put("/:id", VendedorController.update);
router.delete("/:id", VendedorController.remove);

module.exports = router;
