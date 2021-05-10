const admin = require('firebase-admin');
const serviceAccount = require('../' + process.env.GOOGLE_APPLICATION_CREDENTIALS);
const {ValidateEmail, ReturnError} = require('../bin/helpers')
const autoBind = require('auto-bind');


class Firebase {
    constructor() {
        autoBind(this);
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
                databaseURL: 'https://uplanner-challenge.firebaseio.com'
            });
        }
        if (admin.apps) {
            console.log("Successfully connected to " + admin.apps[0].options_.credential.projectId)
        } else {
            console.log("Unable to connect to firebase application.\n")
            console.trace()
        }
    }

    checkAuth(req, res, next) {
        let authorized = true;
        if (authorized == true) {
            next()
        } else {
            res.status(403).json({
                'status': false,
                'data': {}
            })
            return
        }
    }


}

module.exports = new Firebase()
