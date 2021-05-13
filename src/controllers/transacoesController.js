const {Controller} = require('../../base/controller');
const {TransacoesModel} = require('../models/transacoesModel');
const autoBind = require('auto-bind');

require("dotenv").config();

class TransacoesController extends Controller {
    constructor(service) {
        super(service);
        autoBind(this);
    }

    async list(req, res) {
        console.log(req.body.id)
        let transactions = await Promise.resolve(TransacoesModel.listAll({uuid: req.headers.userid, WalletId: req.body.id})).then(data => {
            res.json({
                "status": true,
                "data": data
            })
        })
    }

    async listByWallet(req, res) {
        let transactions = await Promise.resolve(TransacoesModel.listAll({uuid: req.headers.userid, WalletId: req.headers.transaction.WalletId})).then(data => {
            res.json({
                "status": true,
                "data": data
            })
        })
    }

    async create(req, res) {
        let transaction = req.body.transactions;
        transaction.uuid = req.headers.userid
        if (transaction.nome !== "") {
            if (TransacoesModel.insert(transaction)) {
                res.json({
                    "status": true,
                    "data": ""
                })
            }
        }
    }

    async update(req, res) {
        let id = req.body.transactions.id;
        console.log(req.body)
        let wallet = await Promise.resolve(TransacoesModel.update(id, req.body.wallet)).then(data => {
            res.json({
                "status": true,
                "data": data
            })
        })
    }

}

module.exports = new TransacoesController();
