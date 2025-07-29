const fs = require('fs');
const path = require('path');
const pool = require('../db/client');
const {addQuestionToDB} = require('../services/questionService')

const importQuestionsFromJSON = async(req, res) =>{
    const clientConn = await pool.connect();
    try{
        //check if db is empty
        const result = await clientConn.query('SELECT COUNT(*) FROM questions');
        const count = parseInt(result.rows[0].count, 10);
        if(count > 0){
            return res.status(400).json({message: "Questions already exists in database, skipping import"});
        }

        const data = fs.readFileSync(path.join(__dirname, "../exports/questions_export.json"), 'utf-8');
        const questions = JSON.parse(data);

        let successCount = 0;
        let failCount = 0;
        let failedQuestions = [];

        for (let question of questions){
            const result = await addQuestionToDB(question);
            if(result.success){
                successCount++;
            }else{
                failCount++;
                failedQuestions.push(question);
            }

        }

        res.status(200).json({
            message: 'Import Complete',
            imported: successCount,
            failed: failCount
        });


    }catch(err){

        console.error('Import Error: ', err);
        res.status(500).json({error: 'Failed to import questions'});
    }finally{
        clientConn.release();
    }
}

module.exports = { importQuestionsFromJSON}