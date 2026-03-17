// src/dtos/create-user.dto.js
// DTO para validar y transportar los datos de entrada al crear un usuario

class CreateUserDto {
  /**
   * @param {string}      name   - Nombre completo (requerido)
   * @param {string}      email  - Correo electrónico (requerido, único)
   * @param {string|null} phone  - Teléfono (opcional)
   */
  constructor(name, email, phone = null) {
    this.name  = name?.trim();
    this.email = email?.trim().toLowerCase();
    this.phone = phone?.trim() || null;
  }

  /**
   * Valida los campos del DTO
   * @returns {{ valid: boolean, errors: string[] }}
   */
  validate() {
    const errors = [];

    if (!this.name || this.name.length < 2) {
      errors.push('El nombre es requerido y debe tener al menos 2 caracteres.');
    }
    if (this.name && this.name.length > 100) {
      errors.push('El nombre no puede superar los 100 caracteres.');
    }

    if (!this.email) {
      errors.push('El correo electrónico es requerido.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.push('El correo electrónico no tiene un formato válido.');
    }

    if (this.phone && !/^\+?[\d\s\-()]{7,20}$/.test(this.phone)) {
      errors.push('El teléfono no tiene un formato válido.');
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Crea un CreateUserDto desde el body de la request
   * @param {object} body
   * @returns {CreateUserDto}
   */
  static fromBody(body) {
    return new CreateUserDto(body.name, body.email, body.phone);
  }
}

module.exports = CreateUserDto;
