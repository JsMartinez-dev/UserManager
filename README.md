# 👤 User Manager — Node.js + React + PostgreSQL

Aplicación full-stack con arquitectura en capas para gestión de usuarios.

---

## 🗂 Estructura del proyecto

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

## 🧱 Arquitectura en capas (Backend)

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

### DTOs
| DTO | Propósito |
|-----|-----------|
| `CreateUserDto` (back) | Valida y sanitiza datos de entrada |
| `UserResponseDto` | Controla qué campos expone la API |
| `CreateUserDto` (front) | Validación en cliente antes del fetch |

---

## 🚀 Instalación y puesta en marcha

### 1. Base de datos

```sql
-- En psql o pgAdmin ejecuta:
\i backend/database/init.sql
```

### 2. Backend

```bash
cd backend
cp .env.example .env          # Edita con tus credenciales PostgreSQL
npm install
npm run dev                   # http://localhost:3001
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev                   # http://localhost:5173
```

---

## 📡 Endpoints de la API

| Método | Ruta            | Descripción             |
|--------|-----------------|-------------------------|
| GET    | /api/users      | Lista todos los usuarios|
| GET    | /api/users/:id  | Obtiene uno por ID      |
| POST   | /api/users      | Crea un nuevo usuario   |

### Payload POST /api/users

```json
{
  "name":  "Ana Martínez",
  "email": "ana@ejemplo.com",
  "phone": "+57 300 000 0000"   // opcional
}
```

### Respuesta exitosa

```json
{
  "success": true,
  "message": "Usuario creado exitosamente.",
  "data": {
    "id": 4,
    "name": "Ana Martínez",
    "email": "ana@ejemplo.com",
    "phone": "+57 300 000 0000",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}
```
