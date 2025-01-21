const VendedorMiddleware = {
    validarEntrada: (req, res, next) => {
        const { email, dni, username } = req.body;

        // Validar formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res
                .status(400)
                .json({ error: "El correo no tiene un formato válido." });
        }

        // Validar campos obligatorios
        if (!dni || !username || !email) {
            return res
                .status(400)
                .json({ error: "DNI, username y email son obligatorios." });
        }

        next(); // Continuar al siguiente middleware o controlador
    },
};

module.exports = VendedorMiddleware;
