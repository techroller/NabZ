const express = require('express');
const router = express.Router();
const handler = require('../handlers/jobhandler');

router.post('/', handler.handleSubmitNewJob);

module.exports = router;