const express = require('express');
const userRoutes = express.Router();
const { registerUser, registerAdmin, signin } = require('../controllers/auth.controller');

userRoutes.post('/register', registerUser);
userRoutes.post('/register/admin', registerAdmin)
userRoutes.post('/login', signin)


module.exports = { userRoutes }
