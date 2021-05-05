var express = require('express');
var router = express.Router();
var UsuariosController = require('../controllers/usuarioController')


router.get('/login', UsuariosController.login);
router.get('/signup', UsuariosController.signup);

module.exports = router;
