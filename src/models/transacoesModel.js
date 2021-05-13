const BaseModel = require('../../base/baseModel')
const Schema = require('../../config/database')
const autoBind = require('auto-bind');
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId;
const ContasModel = require("./contasModel")

const transacoes = new Schema()

let Model = mongoose.model('transacoes', {
    uuid: {
        type: String,
        required: true
    },
    WalletId: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    valor: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    finalizado: {
        type: Boolean,
        required: false
    },
    tipo: {
        type: String,
        required: true
    }
});

TransacoesModel = new Model()

TransacoesModel.insert = async model => {
    try {
        new Model(model).save()
        return true
    } catch (e) {
        return false
    }
}

TransacoesModel.listAll = async filter => {
    const all = await Model.find(filter).sort({data: -1})
    return Object.assign({}, all);
}

TransacoesModel.update = async (id, newData) => {
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


module.exports = {TransacoesModel}
