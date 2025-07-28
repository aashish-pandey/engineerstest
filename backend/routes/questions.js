const express = require('express');
const router = express.Router();

const {addQuestion, getQuestions} = require('../controllers/questionController');
const {exportAsJSON} = require('../controllers/exportController')



router.post('/', addQuestion);
router.get('/', getQuestions);
router.get('/export/json', exportAsJSON);

module.exports = router;
