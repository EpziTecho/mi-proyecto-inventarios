## Arquitectura del Proyecto

```mermaid
flowchart TB
    subgraph CLIENTES
      A[Aplicación Web] -->|HTTP/HTTPS| B[API (Endpoints REST)]
      C[Aplicación Móvil] -->|HTTP/HTTPS| B
    end

    subgraph SERVIDOR [Backend Node.js]
      B --> D[Controllers]
      D --> E[Services/Use Cases]
      E --> F[Repositories]
      D --> M(Middlewares)
      D --> L[Models (con ORM)]
      E --> U[Utils]
      B --> O[Config / .env]
    end

    subgraph BASE_DE_DATOS [MySQL]
      F --> G[(Tablas:\nRol, menu, Rol_menu,\nCategoria, etc.)]
    end
