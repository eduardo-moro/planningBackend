const express = require('express');
const router = express.Router();
const transacoesController = require('../controllers/transacoesController')
const Firebase = require('../../config/firebase')

router.post('/', Firebase.checkAuth, async(req, res) => {
    transacoesController.list(req, res)
});

router.post('/create', Firebase.checkAuth, async(req, res) => {
    transacoesController.create(req, res)
});

router.post('/update', Firebase.checkAuth, async(req, res) => {
    transacoesController.update(req, res)
});

module.exports = router;
