const { Router } = require("express");
const RolMenuController = require("../controllers/rolMenu.controller");

const router = Router();

// GET /api/rol-menu/:idRol/menus
router.get("/:idRol/menus", RolMenuController.getMenusByRol);

// POST /api/rol-menu/:idRol/menus/:idMenu
router.post("/:idRol/menus/:idMenu", RolMenuController.addMenuToRol);

// DELETE /api/rol-menu/:idRol/menus/:idMenu
router.delete("/:idRol/menus/:idMenu", RolMenuController.removeMenuFromRol);

module.exports = router;
