// src/config/swaggerDef.js
module.exports = {
    openapi: "3.0.0",
    info: {
        title: "API de Inventarios",
        version: "1.0.0",
        description: "Documentación de la API de Inventarios",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Servidor local",
        },
    ],
};
