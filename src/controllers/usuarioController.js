const { Controller } = require( '../../base/controller' );

class UsuarioController extends Controller
{

    login(req, res, next) {
        res.json({
            "status": true,
            "message": "Login realizado com sucesso!",
            "data":[]
        })
    }

    signup(req, res, next) {
        res.json({
            "status": true,
            "message": "Conta criada com sucesso!",
            "data":[]
        })
    }

}

module.exports = new UsuarioController();

