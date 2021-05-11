const BaseModel = require('../../base/baseModel')
const Schema = require('../../config/database')
const autoBind = require('auto-bind');
const mongoose = require('mongoose')

const contas = new Schema()

let Model = mongoose.model('wallets', {
    uuid: {
        type: String,
        required: true
    },
    saldo: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    cor: {
        type: String,
        required: false
    },
    ativa: {
        type: Boolean,
    }
});

ContasModel = new Model()

ContasModel.insert = async model => {
    new Model({ model }).save()
}

ContasModel.listAll = async filter => {
    const all = await Model.find(filter)
    return Object.assign({}, all);
}


module.exports = { ContasModel }
