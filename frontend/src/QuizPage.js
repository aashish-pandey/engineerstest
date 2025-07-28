import React, { useEffect, useState} from 'react';

const QuizPage = () =>{
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/questions')
        .then(res => res.json())
        .then(data => setQuestions(data))
        .catch(err => console.error('Failed to fetch questions:', err));
    }, []);

    const handleChange = (questionId, optionId) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionId}));
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        let sc = 0;
        questions.forEach(q => {
            const correct = q.options.find(opt => opt.is_correct);
            if(answers[q.id] === correct.id)sc++;
        });
        setScore(sc);
    };

    return(
        <div style={{padding: "2rem"}}>
            <h1>Take the Quiz</h1>
            <form onSubmit={handleSubmit}>
                {questions.map((q, idx)=>(
                    <div key={q.id} style={{marginBottom: "2rem"}}>
                        <h3>{idx + 1}. {q.question_text}</h3>
                        {q.options.map(opt => (
                            <div key = {opt.id}>
                                <label>
                                    <input
                                        type='radio'
                                        name={`q-${q.id}`}
                                        value={opt.id}
                                        checked={answers[q.id] === opt.id}
                                        onChange={()=>handleChange(q.id, opt.id)}
                                    />
                                    {opt.option_text}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}

                <button type='submit'>Submit</button>
            </form>
            {score !== null && <h2>Your Score: {score}/{questions.length}</h2>}
        </div>
    )


}

export default QuizPage;