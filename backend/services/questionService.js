const pool = require('../db/client')

const addQuestionToDB = async ({ question_text, options, tags}) =>{
    console.log(question_text);
    console.log(options);
    console.log(tags);
    const clientConn = await pool.connect();
    try{

        await clientConn.query('BEGIN');

        //insert the question
        const questionRes = await clientConn.query(
            `INSERT INTO questions (question_text) VALUES ($1) RETURNING id`,
            [question_text]
        );
        const questionId = questionRes.rows[0].id;

        //Insert the options
        for(let option of options){
            
            await clientConn.query(
                `INSERT INTO question_options (question_id, option_text, is_correct) VALUES ($1, $2, $3)`,
                [questionId, option.option_text, option.is_correct]
            );
        }
        

        //INSERT tags (Create if not exists, then link)
        for(let tagName of tags){
            let tagRes = await clientConn.query(`SELECT id from tags where name = $1`, [tagName]);
            
            let tagId;
            console.log(tagRes.rows);
            if(tagRes.rows.length === 0){
                const insertTagRes = await clientConn.query(
                    `INSERT INTO tags (name) VALUES ($1) RETURNING id`,
                    [tagName]
                );

                tagId = insertTagRes.rows[0].id;
            }else{
                tagId = tagRes.rows[0].id;
            }

            await clientConn.query(
                `INSERT INTO question_tags (question_id, tag_id) VALUES ($1, $2)`,
                [questionId, tagId]
            );
        }

        await clientConn.query('COMMIT');
        return {success: true, id:questionId};

    }catch(err){
        await clientConn.query('ROLLBACK');
        console.error('DB Error Adding Question: ', err);
        return {success: false, error:err};

    }finally{
        clientConn.release();
    
    }
}

module.exports = { addQuestionToDB}