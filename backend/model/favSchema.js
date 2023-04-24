const mongoose = require("mongoose");

const favPodSchema = new mongoose.Schema({
  id:String
});
const favSchema = new mongoose.Schema({
  email:String,
  favorite:[favPodSchema]
});

const FavSchema = mongoose.model("FavSchema", favSchema);

module.exports = FavSchema;