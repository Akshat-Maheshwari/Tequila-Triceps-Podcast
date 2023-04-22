const express = require('express')
let bodyParser = require('body-parser')
require("dotenv").config(); 

const multer = require('multer');
const {GridFsStorage} = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
const cors= require('cors')
const mongoose = require("mongoose");
mongoose.connect(
    process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const adminsSchema = new mongoose.Schema({
    id:String
});
const Admins = mongoose.model('Admins', adminsSchema);

// const podcastSchema= new mongoose.Schema({
//     name:String,
//     description:String,
//     category:String,
//     type:String,
//     speaker:String,
//     file:
// })


const firstadmin= new Admins({
    id:"3SYgc7h4f6crwj9NyLHYt7WXwXq1"
})
firstadmin.save()
.then(
    ()=> console.log("admin added"),
)
.catch((err)=>console.log(err))
        

const app= express()
app.use(cors())

let port = process.env.PORT||3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  return next()
});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
