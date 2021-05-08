const { Controller } = require( '../../base/controller' );

class ContaController extends Controller {
    constructor(service) {
        super(service);
        autoBind(this);
    }

    create() {

    }

    update() {

    }

    inactivate() {

    }


}

module.exports = new ContaController();
