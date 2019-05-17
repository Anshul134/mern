const express = require('express');
const router = express.Router();

const Projects = require('../db/models/projectModel');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/projects";



router.get('/', (req,res,next)=> {
    //establish db connection
    console.log("in /");
    mongoose.connect(url, {useNewUrlParser:true} )
    let db = mongoose.connection;
    db.on("error", ()=>console.log("error"));
    db.on("open", ()=> {
        console.log("connection successfull");
        Projects.find({}).then( (projects)=> {
            res.status(200).send({projects:projects});
            mongoose.connection.close();
            
        }).catch((err)=>{
            if(err) {
                res.status(400).send({error :err})
                mongoose.connection.close();
            }
        })
        
    });
   
});

router.post('/create', (req,res,next)=>{
    console.log("\n\n\n\n\n\nIN /create>>>>>>>>>>>>>>>");
    let {title, content, userId} = req.body;
    console.log("\n\n\nbody>>>>", req.body)
    let  project = new Projects({title, content, userId});
    mongoose.connect(url, {useNewUrlParser:true});
    let db = mongoose.connection;
    db.on('error', ()=> console.log("errror in db connection"));
    db.on('open', () => {
        console.log("connection successfull");
        project.save()
               .then( (project)=> {
                    console.log("project", project)
                     mongoose.connection.close();
                   res.status(200).json({project})
               })
               .catch( (err) => {
                    mongoose.connection.close();   
                    res.status(400).json({err});
               });

    })
   
});

router.get('/get/:id', (req,res,next) => {
    console.log("in /id");
    let _id = req.params.id;
    mongoose.connect(url, {useNewUrlParser:true});
    let db = mongoose.connection;
    db.on('error', ()=> console.log(error) );
    db.on("open", () => {
        console.log("connection successfull");
        Projects.find({_id})
                .then( (project) => {
                    
                    mongoose.connection.close();   
                    res.status(200).json({project:project[0]});
                }).catch( (err) => {
                    mongoose.connection.close(); 
                    res.status(400).json({err})
                })
    })
   
})

module.exports= router;