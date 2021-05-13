const BaseModel = require('../../base/baseModel')
const Schema = require('../../config/database')
const autoBind = require('auto-bind');
const mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectId;

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
    try {
        new Model(model).save()
        return true
    } catch (e) {
        return false
    }
}

ContasModel.listAll = async filter => {
    const all = await Model.find(filter)
    return Object.assign({}, all);
}

ContasModel.update = async (id, newData) => {
    try {
        Model.updateOne(
            {
                _id: ObjectId(id)
            }, {
                $set: newData,
            },
            (err, docs) => {
                    console.log(err)
                    console.log(docs)
            }
        )
    } catch (e) {
        console.log(e)
    }
}


module.exports = {ContasModel}
