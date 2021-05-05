var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
   res.render('index');
});

router.get("/ping", (req, res, next) => {
})

module.exports = router;
