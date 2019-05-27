const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/projects";



var db = mongoose.connect(url, {useNewUrlParser:true},(err)=>{
if(err){
    console.log(err)
} else {
    console.log("Db connected at ", url)
}

} )
module.exports = db;
