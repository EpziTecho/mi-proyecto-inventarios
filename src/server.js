// src/server.js
require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models"); // <-- importa el index.js de models
const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a MySQL establecida correctamente.");

        // Sincroniza los modelos con la DB
        // ¡Cuidado con force: true porque BORRARÁ tablas al reiniciar!
        // Usa alter: true si quieres que modifique sin borrar.
        await sequelize.sync({ alter: false });

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
        process.exit(1);
    }
})();
