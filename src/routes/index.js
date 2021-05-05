var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/ping", (req, res, next) => {
  console.log("pong");
  res.json({"status":"true", "message":"pong", "data":{}})
})

module.exports = router;
