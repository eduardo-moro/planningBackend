const Schema = require('../config/database')
const autoBind = require('auto-bind');

class BaseModel {
    constructor(service) {
        autoBind(this);
    }
}

module.exports = BaseModel
