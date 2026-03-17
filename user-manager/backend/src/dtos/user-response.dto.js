// src/dtos/user-response.dto.js
// DTO de salida: controla exactamente qué campos se exponen al cliente

class UserResponseDto {
  /**
   * @param {number}      id
   * @param {string}      name
   * @param {string}      email
   * @param {string|null} phone
   * @param {Date}        createdAt
   */
  constructor(id, name, email, phone, createdAt) {
    this.id        = id;
    this.name      = name;
    this.email     = email;
    this.phone     = phone;
    this.createdAt = createdAt;
  }

  /**
   * Construye el DTO de respuesta a partir del modelo User
   * @param {import('../models/user.model')} user
   * @returns {UserResponseDto}
   */
  static fromModel(user) {
    return new UserResponseDto(
      user.id,
      user.name,
      user.email,
      user.phone,
      user.createdAt,
    );
  }

  /**
   * Mapea un array de modelos User a DTOs de respuesta
   * @param {import('../models/user.model')[]} users
   * @returns {UserResponseDto[]}
   */
  static fromModelList(users) {
    return users.map(UserResponseDto.fromModel);
  }
}

module.exports = UserResponseDto;
