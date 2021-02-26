const express = require('express');
const router = express.Router();

const { version } = require('../../../../package.json');



router.get('/', function(req, res) {
  res.send({
    version,
  });
});

module.exports = router;
