flowchart TB
    subgraph Clients
        A[Web App] -->|HTTP/HTTPS| B[(API)]
        C[Mobile App] -->|HTTP/HTTPS| B
    end

    subgraph Server
        B --> D[Controllers]
        D --> E[Services]
        E --> F[Repositories]
    end

    subgraph Database [MySQL]
        F --> G[(Tables)]
    end
