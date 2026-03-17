-- ============================================================
-- Script de inicialización de la base de datos
-- Ejecutar en PostgreSQL antes de levantar el backend
-- ============================================================

CREATE DATABASE user_manager;

\c user_manager;

CREATE TABLE IF NOT EXISTS users (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100)        NOT NULL,
    email       VARCHAR(150)        NOT NULL UNIQUE,
    phone       VARCHAR(20),
    created_at  TIMESTAMP           DEFAULT NOW(),
    updated_at  TIMESTAMP           DEFAULT NOW()
);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Datos de prueba
INSERT INTO users (name, email, phone) VALUES
    ('Juan Pérez',    'juan.perez@email.com',    '3001234567'),
    ('María López',   'maria.lopez@email.com',   '3109876543'),
    ('Carlos García', 'carlos.garcia@email.com', NULL);
