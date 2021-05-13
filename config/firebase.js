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

    checkAuth = (req, res, next) => {
        if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
            !req.cookies.__session) {
            res.status(403).send('Unauthorized');
            return;
        }

        let idToken;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            idToken = req.headers.authorization.split('Bearer ')[1];
        }
        admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
            req.user = decodedIdToken;
            next();
        }).catch(error => {
            res.status(403).send('Unauthorized');
        });
    };


}

module.exports = new Firebase()
