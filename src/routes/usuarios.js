const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuarioController')
const Firebase = require('../../config/firebase')

router.get('/signup', UsuariosController.signup);
router.get('/list', UsuariosController.list);
router.get('/pingAuth', Firebase.CheckAuth, async(req, res) => {
    UsuariosController.ping;
}); //utilizada para testar a autorização de acesso.

module.exports = router;
