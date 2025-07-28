const pool = require('../db/client');
const fs = require('fs');
const path = require('path');



const exportAsJSON = async(req, res) => {
    const clientConn = await pool.connect();

    try{
        const [questions, options, tags] = await Promise.all([
            clientConn.query('SELECT * FROM questions'),
            clientConn.query('SELECT * FROM question_options'),
            clientConn.query(`
                SELECT qt.question_id, t.name FROM question_tags qt
                JOIN tags t ON qt.tag_id = t.id
            `),
        ])

        const tagMap = {};
        tags.rows.forEach(({ question_id, name}) => {
            if(!tagMap[question_id]) tagMap[question_id] = [];
            tagMap[question_id].push(name);
        });

        const optionMap = {};
        options.rows.forEach(({question_id, option_text, is_correct}) => {
            if(!optionMap[question_id])optionMap[question_id] = [];
            optionMap[question_id].push({text: option_text, is_correct});
        })

        const result = questions.rows.map((q)=>({
            id:q.id,
            question_text: q.question_text,
            options: optionMap[q.id] || [],
            tags: tagMap[q.id] || []
        }));

        //create export folder if not exist
        const exportDir = path.join(__dirname, '..', 'exports');
        if(!fs.existsSync(exportDir)){
            fs.mkdirSync(exportDir);
        }

        //write JSON File
        const filePath = path.join(exportDir, 'questions_export.json');
        fs.writeFileSync(filePath, JSON.stringify(result, null, 2));

        res.json(result);
    }catch(err){
        console.error('Error exporting JSON:', err);
        res.status(500).json({error: 'Error exporting as json'});
    }finally{
        clientConn.release();
    }
}

module.exports = { exportAsJSON}