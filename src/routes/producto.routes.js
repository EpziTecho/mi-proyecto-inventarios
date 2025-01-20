// src/routes/producto.routes.js
const { Router } = require("express");
const ProductoController = require("../controllers/producto.controller");
const upload = require("../middlewares/upload.middleware");

const router = Router();

router.get("/", ProductoController.getAll);
router.get("/:id", ProductoController.getById);
router.post("/", upload.single("foto"), ProductoController.create);
router.put("/:id", ProductoController.update);
router.delete("/:id", ProductoController.remove);

module.exports = router;
