// src/controllers/user.controller.js
// Capa de presentación: recibe peticiones HTTP, delega al servicio y responde

const userService = require('../services/user.service');

class UserController {
  /**
   * GET /api/users
   * Lista todos los usuarios
   */
  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({
        success: true,
        data: users,
        total: users.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error interno al obtener los usuarios.',
        detail: error.message,
      });
    }
  }

  /**
   * GET /api/users/:id
   * Obtiene un usuario por su ID
   */
  async getById(req, res) {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'El ID debe ser un número válido.' });
      }

      const user = await userService.getUserById(id);
      return res.status(200).json({ success: true, data: user });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ success: false, message: error.message });
    }
  }

  /**
   * POST /api/users
   * Crea un nuevo usuario
   */
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      return res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente.',
        data: user,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message,
        errors: error.errors || undefined,
      });
    }
  }
}

module.exports = new UserController();
