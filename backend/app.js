const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('../backend/src/db/db');

const app = express();

app.use( cors() );
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

const projectRouters = require('./src/routes/projectRouters');

app.use('/project', projectRouters);


const PORT = process.env.port || 5000;

app.listen(PORT, ()=> console.log("listening to 5000"));