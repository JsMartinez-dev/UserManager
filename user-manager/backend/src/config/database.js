
//Azure:

// src/config/database.js
// Configuración y pool de conexiones a PostgreSQL

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false  // obligatorio para Azure
  }
});

// Verificar conexión al iniciar
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
    return;
  }
  release();
  console.log('✅ Conexión a PostgreSQL establecida correctamente-AZURE');
});
module.exports = pool;



// src/config/database.js
// Configuración y pool de conexiones a PostgreSQL

/*
Local:

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'user_manager',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

// Verificar conexión al iniciar
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
    return;
  }
  release();
  console.log('✅ Conexión a PostgreSQL establecida correctamente-LOCAL');
});

module.exports = pool;

*/