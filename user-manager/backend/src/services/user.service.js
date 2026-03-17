// src/services/user.service.js
// Capa de negocio: orquesta la lógica entre DTOs, repositorio y modelos

const userRepository = require('../persistence/user.repository');
const CreateUserDto  = require('../dtos/create-user.dto');
const UserResponseDto = require('../dtos/user-response.dto');

class UserService {
  /**
   * Retorna la lista completa de usuarios como DTOs de respuesta
   * @returns {Promise<UserResponseDto[]>}
   */
  async getAllUsers() {
    const users = await userRepository.findAll();
    return UserResponseDto.fromModelList(users);
  }

  /**
   * Retorna un usuario por su ID
   * @param {number} id
   * @returns {Promise<UserResponseDto>}
   * @throws {Error} si el usuario no existe
   */
  async getUserById(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      const error = new Error(`Usuario con id ${id} no encontrado.`);
      error.statusCode = 404;
      throw error;
    }
    return UserResponseDto.fromModel(user);
  }

  /**
   * Crea un nuevo usuario tras validar el DTO y verificar duplicados
   * @param {object} body - Body crudo de la request
   * @returns {Promise<UserResponseDto>}
   * @throws {Error} si la validación falla o el email ya existe
   */
  async createUser(body) {
    // 1. Construir y validar el DTO de entrada
    const dto = CreateUserDto.fromBody(body);
    const { valid, errors } = dto.validate();

    if (!valid) {
      const error = new Error(errors.join(' '));
      error.statusCode = 400;
      error.errors = errors;
      throw error;
    }

    // 2. Verificar que el email no esté en uso
    const existing = await userRepository.findByEmail(dto.email);
    if (existing) {
      const error = new Error(`El correo "${dto.email}" ya está registrado.`);
      error.statusCode = 409;
      throw error;
    }

    // 3. Persistir y devolver DTO de respuesta
    const created = await userRepository.create(dto);
    return UserResponseDto.fromModel(created);
  }
}

module.exports = new UserService();
