const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config(); 


process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

const DB = process.env.MONGODB_URL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err)=>console.log(err))



const port = 3001;
const server = app.listen(port, () => {
  console.log("Server is up listening on port:" + port);
});