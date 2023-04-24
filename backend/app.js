const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PodcastSchema = require("./model/podcastSchema");
const FavSchema = require("./model/favSchema")
const multer = require("multer");
const cors= require('cors')
var admin = require("firebase-admin");
require('dotenv').config()

const app = express();

const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://podcast-52283-default-rtdb.firebaseio.com",
  storageBucket: process.env.BUCKET_URL
});
app.locals.bucket = admin.storage().bucket()
const multerStorage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public'))
},
filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split("/")[1])
}
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "audio" || file.mimetype.split("/")[0] === "video" || file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("Not a audio or video File!!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});


app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
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

app.get('/',async (req,res)=>{
  res.send("working")
})
app.get('/podcast',async (req,res)=>{
  try{
    const podcasts= await PodcastSchema.find();
    return res.status(200).json(podcasts);
    console.log(podcasts);
  }
  catch(e){
    console.log(e)
  }
})

app.post("/api/uploadFile", upload.single("file"), async(req, res) => {
  console.log(req.file)
  const options = {
		version: 'v2',
		action: 'read',
		expires: '01-01-4000'
	};
  const ext = req.file.mimetype.split("/")[1];
  const fileName =`${Date.now()}.${ext}`
  await app.locals.bucket.file(fileName).createWriteStream().end(req.file.buffer)
  res.send('done');
  const [url] = await app.locals.bucket.file(fileName).getSignedUrl(options);
	// console.log(url);
  const podcastSchema= new PodcastSchema(
    {...req.body,
    count:0,
  fileURL:url}
  )
  podcastSchema.save()
  .then(
      ()=> console.log("Podcast Added"),
  )
  .catch((err)=>console.log(err))
});

app.post("/api/favorite", async(req, res) => {
  try {
    const user = await FavSchema.findOne({ email: req.body.email });
    
    if (user && user.favorite.some((fav) => fav.id === req.body.id)) {
      // The favorite already exists, so remove it
      await FavSchema.findOneAndUpdate(
        { email: req.body.email },
        { $pull: { favorite: { id: req.body.id } } },
        { new: true }
      );
    } else {
      // The favorite doesn't exist, so add it
      await FavSchema.findOneAndUpdate(
        { email: req.body.email },
        { $addToSet: { favorite: { id: req.body.id } } },
        { upsert: true, new: true }
      );
    }

    console.log('favorite toggles');
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/favorite', async(req, res) => {
  const userEmail = req.query.email;
  if (!userEmail) {
    // The email parameter is missing
    return res.status(400).send('Missing email parameter');
  }
  try {
    const user = await FavSchema.findOne({ email: userEmail });
    if (!user) {
      // The user doesn't exist
      return res.status(404).send('User not found');
    }
    const favorites = user.favorite;
    res.send(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



////////////////////////////////////////////////////////////////////
app.post("/api/uploadMultiple", upload.fields(
  [
      {
          name:'file', maxCount:1
      },
      {
          name: 'thumbnail', maxCount:1
      }
  ]
), async(req, res) => {
  const options = {
		version: 'v2',
		action: 'read',
		expires: '01-01-4000'
	};
  // console.log(req.files.file);
  const podFile = req.files.file[0];
  const thumbnailFile = req.files.thumbnail[0];
  // const fileName = req.body.title;
  // console.log(podFile.mimetype);
  // console.log(thumbnailFile.mimetype);
  const ext1 = podFile.mimetype.split("/")[1];
  const podFileName =`${podFile.fieldname}-${Date.now()}.${ext1}`
  const ext2 = thumbnailFile.mimetype.split("/")[1];
  const thumbnailFileName =`${thumbnailFile.fieldname}-${Date.now()}.${ext2}`
  // console.log(thumbnailFileName);
  await app.locals.bucket.file(thumbnailFileName).createWriteStream().end(req.files.thumbnail[0].buffer)
  await app.locals.bucket.file(podFileName).createWriteStream().end(req.files.file[0].buffer)
  res.send('done');
  const [url] = await app.locals.bucket.file(podFileName).getSignedUrl(options);
  const [thumbnailURL] = await app.locals.bucket.file(thumbnailFileName).getSignedUrl(options);
  const podcastSchema= new PodcastSchema(
    {...req.body,
    count:0,
    fileURL:url,
    thumbnailURL:thumbnailURL}
  )
  podcastSchema.save()
  .then(
      ()=> console.log("Podcast Added"),
  )
  .catch((err)=>console.log(err))
  
})



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
