const express = require('express');
const router = express.Router();
const handler = require('../handlers/jobhandler');

router.post('/', handler.createJob);
router.get('/:id', handler.getJob);
router.get('/', handler.listJobs);
router.delete('/:id', handler.deleteJob);

module.exports = router;