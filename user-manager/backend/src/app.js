// src/app.js
// Punto de entrada de la aplicación Express

require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const userRoutes = require('./routes/user.routes');

const app  = express();
const PORT = process.env.PORT || 3001;

// ─── Middlewares globales ────────────────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173',   // URL del frontend Vite/React
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// ─── Rutas ───────────────────────────────────────────────────────────────────
app.use('/api/users', userRoutes);

// ─── Ruta raíz (health check) ────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'User Manager API running ' });
});

// ─── Manejo de rutas no encontradas ──────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada.' });
});

// ─── Inicio del servidor ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
