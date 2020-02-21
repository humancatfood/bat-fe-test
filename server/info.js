const express = require('express');
const router = express.Router();

const { subscribers } = require('./ws');

const { version } = require('../package.json');



router.get('/', function(req, res) {
  res.send({
    subscribers: subscribers.size,
    version,
  });
});

module.exports = router;
