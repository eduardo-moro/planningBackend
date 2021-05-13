const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuarioController')
const Firebase = require('../../config/firebase')

router.get('/pingAuth', Firebase.checkAuth, async(req, res) => {
    UsuariosController.ping(req, res);
}); //utilizada para testar a autorização de acesso.

module.exports = router;
