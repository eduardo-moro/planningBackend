const {Controller} = require('../../base/controller');
const {ContasModel} = require('../models/contasModel');
const autoBind = require('auto-bind');

require("dotenv").config();


class ContaController extends Controller {
    constructor(service) {
        super(service);
        autoBind(this);
    }

    async list(req, res) {
        let wallets = await Promise.resolve(ContasModel.listAll()).then(data => {
            res.json({
                "status": true,
                "data": data
            })
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
