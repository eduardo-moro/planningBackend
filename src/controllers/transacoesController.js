const {Controller} = require('../../base/controller');
const {TransacoesModel} = require('../models/transacoesModel');
const {ContasModel} = require('../models/contasModel')
const autoBind = require('auto-bind');

require("dotenv").config();

class TransacoesController extends Controller {
    constructor(service) {
        super(service);
        autoBind(this);
    }

    async list(req, res) {
        let filter = (req.body.id !== undefined) ? {
            uuid: req.headers.userid,
            WalletId: req.body.id
        } : {uuid: req.headers.userid}
        let transactions = await Promise.resolve(TransacoesModel.listAll(filter)).then(data => {
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
                if (transaction.finalizado) {
                    await ContasModel.listAll({
                        uuid: transaction.uuid,
                        _id: transaction.WalletId
                    }).then(async conta => {
                        if (transaction.tipo == "saida") {
                            if ((typeof conta.saldo) === Object || (typeof conta.saldo) === NaN || conta.saldo === undefined) {
                                conta.saldo = 0;
                            }
                            console.table([
                                parseFloat(conta.saldo),
                                parseFloat(transaction.valor),
                                (parseFloat(conta.saldo) - parseFloat(transaction.valor)).toString()
                            ])
                            conta.saldo = (parseFloat(conta.saldo) - parseFloat(transaction.valor)).toString()
                        } else {
                            if ((typeof conta.saldo) === Object || (typeof conta.saldo) === NaN || conta.saldo === undefined) {
                                conta.saldo = 0;
                            }
                            console.table([
                                parseFloat(conta.saldo),
                                parseFloat(transaction.valor),
                                (parseFloat(conta.saldo) + parseFloat(transaction.valor)).toString()
                            ])
                            conta.saldo = (parseFloat(conta.saldo) + parseFloat(transaction.valor)).toString()
                        }
                        let wallet = await Promise.resolve(ContasModel.update(transaction.WalletId, conta)).then(data => {
                            res.json({
                                "status": true,
                                "data": data
                            })
                        })
                    })
                } else {
                    res.json({
                        "status": true,
                        "data": ""
                    })
                }
            }
        }
    }

    async update(req, res) {
        let id = req.body.transactions.id;
        let wallet = await Promise.resolve(TransacoesModel.update(id, req.body.wallet)).then(data => {
            res.json({
                "status": true,
                "data": data
            })
        })
    }

}

module.exports = new TransacoesController();
