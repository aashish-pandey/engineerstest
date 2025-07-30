const pool = require('..//db/client');


//if i have to get the dsa questions from computer science grad, i will have a tag "DSA_Computer_Science_Grad", we are not combining multiple tags
//but making a new tag for faster aceess or easier code logic.

const getQuestionsByTag = async(req, res)=>{
    const clientConn = await pool.connect();
    const {tag, page = 1, limit = 10} = req.query;
    const offset = (page - 1) * limit;

    try{
        const query = `
        SELECT q.id AS question_id, q.question_text, 
        qo.option_text, qo.is_correct, t.name AS tag
        FROM questions q
        JOIN question_options qo ON q.id = qo.question_id
        JOIN question_tags qt ON q.id = qt.question_id
        JOIN tags t ON qt.tag_id = t.id
        WHERE t.name = $1
        ORDER BY q.id
        LIMIT $2 OFFSET $3
        `;

        const result = await clientConn.query(query, [tag, limit, offset]);

        res.status(200).json({
            message: `Questions with tag '${tag}'`,
            page: parseInt(page),
            limit: parseInt(limit),
            data: result.rows
        });
    }catch(err){
        console.error('Error fetching questions by tag: ', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

module.exports = { getQuestionsByTag }