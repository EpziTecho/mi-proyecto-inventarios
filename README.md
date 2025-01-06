## Architecture

```mermaid
flowchart TB
    subgraph Clients
        A[Web App] -->|HTTP/HTTPS| B[API (REST)]
        C[Mobile App] -->|HTTP/HTTPS| B
    end

    subgraph Server [Backend Node.js]
        B --> D[Controllers]
        D --> E[Services]
        E --> F[Repositories]
        D --> M[Middlewares]
        D --> L[Models/Entities]
        E --> U[Utils]
        B --> O[Config / .env]
    end

    subgraph Database [MySQL]
        F --> G[(Tables:\nRol, menu, Rol_menu,\nCategoria, etc.)]
    end

  
