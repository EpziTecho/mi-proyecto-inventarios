const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Ruta base /api" });
});

module.exports = router;
