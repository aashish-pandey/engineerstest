const express = require('express')

const questionRoutes = require('./routes/questions');


const app = express();
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello World");
});

app.use('/questions', questionRoutes)



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});