const express = require('express')
const cors = require('cors')

const questionRoutes = require('./routes/questions');
const taggedRoutes = require('./routes/taggedQuestions');


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Hello World");
});

app.use('/questions', questionRoutes);
app.use('/api/tags', taggedRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});