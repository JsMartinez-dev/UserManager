// src/hooks/useUsers.js
// Hook personalizado que gestiona el estado de usuarios (lista + creación)

import { useState, useEffect, useCallback } from 'react';
import { fetchUsers, createUser } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

export function useUsers() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // ── Cargar lista ───────────────────────────────────────────────────────────
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los usuarios.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // ── Crear usuario ──────────────────────────────────────────────────────────
  /**
   * @param {{ name: string, email: string, phone?: string }} formData
   * @returns {Promise<{ success: boolean, fieldErrors?: object, message?: string }>}
   */
  const addUser = useCallback(async (formData) => {
    const dto = new CreateUserDto(formData.name, formData.email, formData.phone);
    const { valid, errors } = dto.validate();

    if (!valid) return { success: false, fieldErrors: errors };

    try {
      const newUser = await createUser(dto);
      setUsers((prev) => [newUser, ...prev]);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Error al crear el usuario.';
      return { success: false, message };
    }
  }, []);

  return { users, loading, error, addUser, reload: loadUsers };
}
