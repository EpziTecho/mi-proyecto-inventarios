const { Router } = require("express");
const RolController = require("../controllers/rol.controller");

const router = Router();

router.get("/", RolController.getAll);
router.get("/:id", RolController.getById);
router.post("/", RolController.create);
router.put("/:id", RolController.update);
router.delete("/:id", RolController.remove);

module.exports = router;
