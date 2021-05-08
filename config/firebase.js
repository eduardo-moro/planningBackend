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

    // esta função veio da documentação do firebase e foi adaptada para atender a aplicação
    async createUser(req, res) {
        let {email, password, firstName, lastName} = req.body;

        if (!ValidateEmail(email)) {
            return {"message": "Invalid email."}
        }

        try {
            let user = await admin.auth().createUser({
                email,
                password,
                displayName: `${firstName} ${lastName}`,
            })
            return user;
        } catch (e) {
            return e.errorInfo
        }
    }

    async listUsers(req, res, next) {
        let users = [];
        await admin
            .auth()
            .listUsers(1000,"1")
            .then((listUsersResult) => {
                listUsersResult.users.forEach((userRecord) => {
                    users.push(userRecord.toJSON());
                });
            })
            .catch((error) => {
                console.log('Error listing users:', error);
                return(error);
            });
        return(users);
    }

    // esta função veio da documentação do firebase e não precisou ser alterada
    getAuthToken = (req, res, next) => {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(' ')[0] === 'Bearer'
        ) {
            req.authToken = req.headers.authorization.split(' ')[1];
        } else {
            req.authToken = null;
        }
        next();
    };

    // esta função veio da documentação do firebase e não precisou ser alterada
    CheckAuth(req, res, next) {
        console.table(req.headers)
        this.getAuthToken(req, res, async () => {
            try {
                const {authToken} = req;
                const userInfo = await admin
                    .auth()
                    .verifyIdToken(authToken);
                req.authId = userInfo.uid;
                return next();
            } catch (e) {
                return res
                    .status(401)
                    .send({error: 'You are not authorized to make this request'});
            }
        });
    }


}

module.exports = new Firebase()
