const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CreateUser = require('../application/CreateUser');
const LoginUser = require('../application/LoginUser');
const UserRepositorySQLite = require('../infrastructure/UserRepositorySQLite');

const router = express.Router();
const userRepo = new UserRepositorySQLite();
const createUser = new CreateUser(userRepo);
const loginUser = new LoginUser(userRepo);

// Rota de cadastro (já criada)
router.post('/users', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser.execute({ name, email, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota de login (nova)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser.execute({ email, password });
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
