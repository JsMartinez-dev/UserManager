// src/routes/user.routes.js
// Definición de rutas para el recurso /users

const { Router } = require('express');
const userController = require('../controllers/user.controller');

const router = Router();

// GET  /api/users        → listar todos
// GET  /api/users/:id    → obtener uno por ID
// POST /api/users        → crear nuevo usuario

router.get('/',    (req, res) => userController.getAll(req, res));
router.get('/:id', (req, res) => userController.getById(req, res));
router.post('/',   (req, res) => userController.create(req, res));

module.exports = router;
