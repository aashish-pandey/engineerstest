const express = require('express');
const router = express.Router();
const { getQuestionsByTag } = require('../controllers/taggedQuestionsController');

router.get('/by-tag', getQuestionsByTag);

module.exports = router;