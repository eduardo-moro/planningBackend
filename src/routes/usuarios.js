var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.json({"status":true, "data":[]});
});

module.exports = router;
