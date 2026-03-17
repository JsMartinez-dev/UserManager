// src/models/user.model.js
// Modelo que representa la entidad User tal como existe en la base de datos

class User {
  /**
   * @param {number}  id
   * @param {string}  name
   * @param {string}  email
   * @param {string|null} phone
   * @param {Date}    createdAt
   * @param {Date}    updatedAt
   */
  constructor(id, name, email, phone = null, createdAt = null, updatedAt = null) {
    this.id        = id;
    this.name      = name;
    this.email     = email;
    this.phone     = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Construye un User a partir de una fila devuelta por pg
   * @param {object} row
   * @returns {User}
   */
  static fromRow(row) {
    return new User(
      row.id,
      row.name,
      row.email,
      row.phone     ?? null,
      row.created_at,
      row.updated_at,
    );
  }
}

module.exports = User;
