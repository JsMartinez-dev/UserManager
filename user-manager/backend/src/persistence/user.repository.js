// src/persistence/user.repository.js
// Capa de persistencia: toda interacción directa con la base de datos

const pool = require('../config/database');
const User = require('../models/user.model');

class UserRepository {
  /**
   * Obtiene todos los usuarios ordenados por fecha de creación
   * @returns {Promise<User[]>}
   */
  async findAll() {
    const query = `
      SELECT id, name, email, phone, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
    `;
    const { rows } = await pool.query(query);
    return rows.map(User.fromRow);
  }

  /**
   * Busca un usuario por su ID
   * @param {number} id
   * @returns {Promise<User|null>}
   */
  async findById(id) {
    const query = `
      SELECT id, name, email, phone, created_at, updated_at
      FROM users
      WHERE id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows.length ? User.fromRow(rows[0]) : null;
  }

  /**
   * Busca un usuario por su email
   * @param {string} email
   * @returns {Promise<User|null>}
   */
  async findByEmail(email) {
    const query = `
      SELECT id, name, email, phone, created_at, updated_at
      FROM users
      WHERE email = $1
    `;
    const { rows } = await pool.query(query, [email]);
    return rows.length ? User.fromRow(rows[0]) : null;
  }

  /**
   * Inserta un nuevo usuario en la base de datos
   * @param {import('../dtos/create-user.dto')} dto
   * @returns {Promise<User>}
   */
  async create(dto) {
    const query = `
      INSERT INTO users (name, email, phone)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, phone, created_at, updated_at
    `;
    const { rows } = await pool.query(query, [dto.name, dto.email, dto.phone]);
    return User.fromRow(rows[0]);
  }
}

module.exports = new UserRepository();
