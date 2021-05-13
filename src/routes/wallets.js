const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController')
const Firebase = require('../../config/firebase')

router.post('/', Firebase.checkAuth, async(req, res) => {
    contaController.list(req, res)
});

router.post('/create', Firebase.checkAuth, async(req, res) => {
    contaController.create(req, res)
});

router.post('/update', Firebase.checkAuth, async(req, res) => {
    contaController.update(req, res)
});

module.exports = router;
