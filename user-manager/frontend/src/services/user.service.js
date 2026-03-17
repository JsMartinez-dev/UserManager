// src/services/user.service.js
// Capa de servicio del frontend: encapsula todas las llamadas a la API REST

import axios from 'axios';

const BASE_URL = '/api/users';

/**
 * Obtiene todos los usuarios
 * @returns {Promise<import('../dtos/create-user.dto').CreateUserDto[]>}
 */
export async function fetchUsers() {
  const { data } = await axios.get(BASE_URL);
  return data.data;   // { success, data: UserResponseDto[], total }
}

/**
 * Obtiene un usuario por ID
 * @param {number} id
 */
export async function fetchUserById(id) {
  const { data } = await axios.get(`${BASE_URL}/${id}`);
  return data.data;
}

/**
 * Crea un nuevo usuario enviando el payload del DTO
 * @param {import('../dtos/create-user.dto').CreateUserDto} dto
 */
export async function createUser(dto) {
  const { data } = await axios.post(BASE_URL, dto.toPayload());
  return data.data;   // UserResponseDto recién creado
}
