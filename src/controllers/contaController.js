const { Controller } = require( '../../base/controller' );
const autoBind = require('auto-bind');
require("dotenv").config();

class ContaController extends Controller {
    constructor(service) {
        super(service);
        autoBind(this);
    }

    list(req, res) {
        res.json({
            "status": true,
            "data": {

            }
        })
    }

    create() {

    }

    update() {

    }

    inactivate() {

    }


}

module.exports = new ContaController();
