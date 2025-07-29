const express = require('express');
const router = express.Router();

const {addQuestion, getQuestions} = require('../controllers/questionController');
const {exportAsJSON} = require('../controllers/exportController');
const { importQuestionsFromJSON } = require('../controllers/importController');



router.post('/', addQuestion);
router.get('/', getQuestions);
router.get('/export/json', exportAsJSON);
router.get('/import/json', importQuestionsFromJSON);

module.exports = router;
