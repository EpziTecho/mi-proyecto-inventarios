const { Router } = require("express");
const VendedorController = require("../controllers/vendedor.controller");
const upload = require("../middlewares/upload.middleware");

const router = Router();

router.get("/", VendedorController.getAll);
router.get("/:id", VendedorController.getById);
router.post("/", upload.single("foto"), VendedorController.create);
router.put("/:id", upload.single("foto"), VendedorController.update);
router.delete("/:id", VendedorController.remove);

module.exports = router;
