const {Controller} = require('../../base/controller');
const Database = require('../../config/database');
const Firebase = require('../../config/firebase');
const autoBind = require('auto-bind');
const {ReturnError} = require('../../bin/helpers')
require("dotenv").config();


class UsuarioController extends Controller {

    /*
     * Esta função é responsável por trazer os parents da classe
     * e dar um bind em sí própria, permitindo o uso do "this"
    */
    constructor(service) {
        super(service);
        autoBind(this);
    }

    /*
     * Utilizada para teste durante o desenvolvimento.
     */
    ping(req, res) {
        res.json({
            "status": true,
            "data": {
                "message": "pong!",
                "congrats": "you have successfully connected to firebase!"
            }
        })
    }

}

module.exports = new UsuarioController();

