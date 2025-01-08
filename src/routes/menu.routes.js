const { Router } = require("express");
const MenuController = require("../controllers/menu.controller");

const router = Router();

router.get("/", MenuController.getAll);
router.get("/:id", MenuController.getById);
router.post("/", MenuController.create);
router.put("/:id", MenuController.update);
router.delete("/:id", MenuController.remove);

module.exports = router;
