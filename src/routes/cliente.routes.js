// src/routes/cliente.routes.js
const { Router } = require("express");
const ClienteController = require("../controllers/cliente.controller");

const router = Router();

router.get("/", ClienteController.getAll);
router.get("/:id", ClienteController.getById);
router.post("/", ClienteController.create);
router.put("/:id", ClienteController.update);
router.delete("/:id", ClienteController.remove);

module.exports = router;
