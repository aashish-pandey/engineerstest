const pool = require('../db/client');

const addQuestion = async(req, res) => {
    const {question_text, options, tags} = req.body;

    const clientConn = await pool.connect();

    try{

        await clientConn.query('BEGIN');

        //Insert the question
        const questionRes = await clientConn.query(
            `INSERT INTO questions (question_text) VALUES ($1) RETURNING id`, 
            [question_text]
        );
        const questionId = questionRes.rows[0].id;

        //Insert the options
        for (let option of options){
            await clientConn.query(
                `INSERT INTO question_options (question_id, option_text, is_correct) VALUES ($1, $2, $3)`,
                [questionId, option.option_text, option.is_correct]
            );
        }

        //Insert tags if not exists and link with question
        for(let tagName of tags){
            //check if tag exists
            let tagRes = await clientConn.query(`SELECT id from tags WHERE name = $1`, [tagName]);
            let tagId;

            if (tagRes.rows.length === 0){
                //insert tag
                const insertTagRes = await clientConn.query(
                    `INSERT INTO tags (name) VALUES ($1) RETURNING id`,
                    [tagName]
                );

                tagId = insertTagRes.rows[0].id;
            }else{
                tagId = tagRes.rows[0].id;
            }

            //Insert into question_tags
            await clientConn.query(
                `INSERT INTO question_tags (question_id, tag_id) VALUES ($1, $2)`,
                [questionId, tagId]
            );
        }

        await clientConn.query('COMMIT');
        res.status(201).json({message: 'Question added successfully.'});

    }catch(error){
        await clientConn.query('ROLLBACK');
        console.error('Error adding question: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }finally {
        clientConn.release();
    }
}

const getQuestion = async(req, res)=>{
    const clientconn = await pool.connect();
    try{

    }catch(error){
        console.log('Error Fetching Questions: ', error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = {addQuestion};