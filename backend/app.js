const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());
app.get("/", (req,res)=>console.log("here in /"));

app.post("/project/create", (req, res)=> {
	const {project} = req.body;
	console.log(project);
	res.send(project);
})

app.listen(5000, ()=> console.log("listening to 5000"));