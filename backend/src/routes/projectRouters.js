const express = require('express');
const router = express.Router();
const Projects = require('../db/models/projectModel');

router.get('/', (req,res,next)=> {
    //establish db connection
    console.log("in /");
   
        Projects.find({}, (err,projects)=> {
            if(err)  {
                //throw err;
              //  mongoose.connection.close();   
                res.send({err});
            } else {
              //  res.json({projects:projects});
              //  mongoose.connection.close();
              res.json({projects:projects});
            }
            
         })
         //.catch((err)=>{
        //     if(err) {
        //         res.send({error :err})
        //         mongoose.connection.close();
        //     }
        // })
    });

router.post('/create', (req,res,next)=>{
    console.log("\n\n\n\n\n\nIN /create>>>>>>>>>>>>>>>");
    let {title, content, userId} = req.body;
    console.log("\n\n\nbody>>>>", req.body)
    let  project = new Projects({title, content, userId});

        console.log("connection successfull");
        project.save( (err, project)=> {
                    if(err)  {
                       
                        res.status(400).json({err});
                    } else {
                        console.log("project", project)
                    
                         res.status(200).json({project})
                    }
               })
               .catch( (err) => {
                    
               });

   
});

router.get('/get/:id', (req,res,next) => {
    console.log("in /id");
    let _id = req.params.id;

   
        console.log("connection successfull");
        Projects.find({_id}, (err,project) => {
                    if(err)  {
                        
                        res.status(400).json({err})
                    } else {
                      
                        res.status(200).json({project:project[0]});
                    }
                })
    
})

module.exports= router;