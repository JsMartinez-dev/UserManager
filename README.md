
# Aplicación full-stack con arquitectura en capas para gestión de usuarios.

---

## Estructura del proyecto

```
user-manager/
├── backend/
│   ├── database/
│   │   └── init.sql                  ← Script de base de datos
│   ├── src/
│   │   ├── app.js                    ← Punto de entrada Express
│   │   ├── config/
│   │   │   └── database.js           ← Pool de conexión PostgreSQL
│   │   ├── models/
│   │   │   └── user.model.js         ← Entidad User (mapeo DB → JS)
│   │   ├── dtos/
│   │   │   ├── create-user.dto.js    ← Validación de entrada
│   │   │   └── user-response.dto.js  ← Forma de la respuesta al cliente
│   │   ├── persistence/
│   │   │   └── user.repository.js    ← Consultas SQL (pg)
│   │   ├── services/
│   │   │   └── user.service.js       ← Lógica de negocio
│   │   ├── controllers/
│   │   │   └── user.controller.js    ← Handlers HTTP
│   │   └── routes/
│   │       └── user.routes.js        ← Definición de rutas
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── src/
    │   ├── main.jsx                  ← Punto de entrada React
    │   ├── App.jsx                   ← Componente raíz
    │   ├── App.module.css
    │   ├── index.css                 ← Variables globales y reset
    │   ├── dtos/
    │   │   └── create-user.dto.js    ← DTO + validación cliente
    │   ├── services/
    │   │   └── user.service.js       ← Llamadas axios a la API
    │   ├── hooks/
    │   │   └── useUsers.js           ← Estado de usuarios (hook)
    │   └── components/
    │       ├── UserForm/
    │       │   ├── UserForm.jsx
    │       │   └── UserForm.module.css
    │       ├── UserCard/
    │       │   ├── UserCard.jsx
    │       │   └── UserCard.module.css
    │       └── UserList/
    │           ├── UserList.jsx
    │           └── UserList.module.css
    └── package.json
```

---

##  Arquitectura en capas (Backend)

```
Request HTTP
     ↓
[ Controller ]   → Recibe y responde HTTP, sin lógica de negocio
     ↓
[  Service   ]   → Valida DTOs, orquesta reglas de negocio
     ↓
[ Repository ]   → Única capa que toca la base de datos (SQL)
     ↓
[   Model    ]   → Representa la entidad tal como existe en DB
```

