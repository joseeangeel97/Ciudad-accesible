const express = require('express');
const router = express.Router();

// Importamos los middlewares personalizados.
const authUser = require('../middlewares/authUser');
const userExists = require('../middlewares/userExists');
const authUserOptional = require('../middlewares/authUserOptional');

const { newUser, loginUser, getUser } = require('../controllers/users/index');

//Registro de usuario

router.post('/users', newUser);

// Login de usuario.
router.post('/users/login', loginUser);

//Obtener información de mi usuario.
router.get('/users', getUser);

module.exports = router;
