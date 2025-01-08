// src/config/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDef = require("./swaggerDef");

// Opciones para swagger-jsdoc
const options = {
    definition: swaggerDef,
    // Aquí definimos los archivos donde swagger-jsdoc buscará comentarios JSDoc
    apis: [
        "./src/routes/*.js", // Endpoints en tus archivos de rutas
        "./src/controllers/*.js", // O si agregas JSDoc en controladores
    ],
};

// Genera el especificador (swaggerSpec)
const swaggerSpec = swaggerJsdoc(options);

// Función para configurar la ruta de Swagger UI
function swaggerDocs(app, port) {
    // Ruta donde se sirve la documentación
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Puedes agregar un endpoint JSON crudo: http://localhost:3000/api/docs.json
    app.get("/api/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    console.log(`Swagger Docs disponible en http://localhost:${port}/api/docs`);
}

module.exports = { swaggerDocs };
