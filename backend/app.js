const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PodcastSchema = require("./model/podcastSchema");
const multer = require("multer");
const cors= require('cors')

const app = express();
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "audio" || file.mimetype.split("/")[0] === "video") {
    cb(null, true);
  } else {
    cb(new Error("Not a audio or video File!!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
// Configurations for "body-parser"
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  return next()
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));


app.post("/api/uploadFile", upload.single("file"), (req, res) => {
  // console.log(req.body);
  const podcastSchema= new PodcastSchema(
    {...req.body,
    count:0,
  fileURL:req.file.filename}
  )
  podcastSchema.save()
  .then(
      ()=> console.log("Podcast Added"),
  )
  .catch((err)=>console.log(err))
});

//Express server
module.exports = app;






// const express = require('express')
// let bodyParser = require('body-parser')
// const path = require('path');
// const crypto = require('crypto');
// require("dotenv").config(); 

// const multer = require('multer');
// const {GridFsStorage} = require("multer-gridfs-storage");
// const Grid = require('gridfs-stream');
// const cors= require('cors')
// const methodOverride = require('method-override');

// const mongoose = require("mongoose");
// mongoose.connect(
//     process.env.MONGODB_URL, 
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// );

// const app= express()
// app.use(cors())

// let port = process.env.PORT||3000

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//   res.header('Access-Control-Allow-Credentials', true)
//   return next()
// });

// app.use(methodOverride('_method'));


// let bucket;
// mongoose.connection.on("connected", () => {
//   var db = mongoose.connections[0].db;
//   bucket = new mongoose.mongo.GridFSBucket(db, {
//     bucketName: "newBucket"
//   });
//   console.log(bucket);
// });
// const conn = mongoose.createConnection(process.env.MONGODB_URL); 
// let gfs;
// conn.once('open', () => {
//     // Init stream
//     gfs = Grid(conn.db, mongoose.mongo);  
//     gfs.collection('uploads');
//   });

//   const storage = new GridFsStorage({
//     url: process.env.MONGODB_URL,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//           const filename = file.originalname;
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//       });
//     }
//   });
  
//   const upload = multer({ storage})
//   app.post('/upload', upload.single('file'), (req, res) => {
//     res.redirect('/');
//   });

// const adminsSchema = new mongoose.Schema({
//     id:String
// });
// const Admins = mongoose.model('Admins', adminsSchema);


// // const podcastSchema= new mongoose.Schema({
// //     name:String,
// //     description:String,
// //     category:String,
// //     type:String,
// //     speaker:String,
// //     file:
// // })


// const firstadmin= new Admins({
//     id:"3SYgc7h4f6crwj9NyLHYt7WXwXq1"
// })
// firstadmin.save()
// .then(
//     ()=> console.log("admin added"),
// )
// .catch((err)=>console.log(err))
        


// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
