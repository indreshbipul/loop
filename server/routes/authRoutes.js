const authController = require('../controllers/authController');
const authCheck = require('../middleware/authCheck')

const express = require('express');
const authRoutes = express.Router();

authRoutes.get('/session', authCheck, authController.loginSession);

authRoutes.post('/login', authController.login);

authRoutes.put('/logout', authCheck, authController.logout);

authRoutes.post('/register', authController.register);

authRoutes.get('/profile', authCheck, authController.getProfile);


module.exports = authRoutes;
