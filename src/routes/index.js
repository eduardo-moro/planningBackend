var express = require('express');
var router = express.Router();
const Database = require("../../config/database")

/* GET home page. */
router.get('/', (req, res, next) => {
   res.render('index');
});

router.get("/ping", (req, res, next) => {
  console.log("pong");
  client = new Database();
  res.json({"status":"true", "message":"pong", "data":client.client})
})

module.exports = router;
