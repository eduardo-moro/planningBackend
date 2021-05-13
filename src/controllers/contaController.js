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
        let wallets = await Promise.resolve(ContasModel.listAll({uuid: req.headers.userid})).then(data => {
            res.json({
                "status": true,
                "data": data
            })
        })
    }


    async create(req, res) {
        let wallet = req.body.wallet;
        wallet.uuid = req.headers.userid
        if (wallet.nome !== "") {
            if (ContasModel.insert(wallet)) {
                res.json({
                    "status": true,
                    "data": ""
                })
            }
        }
    }

    async update(req, res) {
        let walletId = req.body.wallet.id;
        let wallet = await Promise.resolve(ContasModel.update(walletId, req.body.wallet)).then(data => {
            res.json({
                "status": true,
                "data": data
            })
        })
    }

}

module.exports = new ContaController();
