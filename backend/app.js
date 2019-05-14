const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

const projectRouters = require('./src/routes/projectRouters');

app.use('/project/', projectRouters);
app.get('/', (req,res) => res.send("in / route"));

const PORT = process.env.port || 5000;

app.listen(PORT, ()=> console.log("listening to 5000"));