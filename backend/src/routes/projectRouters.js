const express = require('express');
const router = express.Router();

const Projects = require('../db/models/projectModel');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/projects";

router.get('/', (req,res,next)=> {
    res.send("route /");
    next();
});

router.get('/fetch', (req,res,next)=> {
    //establish db connection
    mongoose.connect(url, {useNewUrlParser:true} )
    let db = mongoose.connection;
    db.on("error", ()=>console.log("error"));
    db.on("open", ()=> {
        console.log("connection successfull");
        Projects.find({}).then( (projects)=> {
            mongoose.connection.close();
            res.status(200).json({projects:projects});
        }).catch((err)=>{
            if(err) {
                mongoose.connection.close();
                res.status(400).json({error :err})
            }
        })
        
    });
    
});

router.post('/create', (req,res,next)=>{
    let {title, content, userId} = req.body;
    
    let  project = new Projects({title, content, userId});
    mongoose.connect(url, {useNewUrlParser:true});
    let db = mongoose.connection;
    db.on('error', ()=> console.log("errror in db connection"));
    db.on('open', () => {
        console.log("connection successfull");
        project.save()
               .then( (project)=> {
                     mongoose.connection.close();
                   res.status(200).json({project})
               })
               .catch( (err) => {
                    mongoose.connection.close();   
                    res.status(400).json({err});
               });

    })
});

router.get('/:id', (req,res,next) => {
    let _id = req.params.id;
    mongoose.connect(url, {useNewUrlParser:true});
    let db = mongoose.connection;
    db.on('error', ()=> console.log(error) );
    db.on("open", () => {
        console.log("connection successfull");
        Projects.find({_id})
                .then( (project) => {
                    mongoose.connection.close();   
                    res.status(200).json({project});
                }).catch( (err) => {
                    mongoose.connection.close(); 
                    res.status(400).json({err})
                })
    })
})

module.exports= router;