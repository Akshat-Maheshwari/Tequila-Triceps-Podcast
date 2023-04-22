// Calling the "mongoose" package
const mongoose = require("mongoose");

// Creating a Schema for uploaded files
const podcastSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  podcastName: {
    type: String,
    required: [true],
  },
  podcastDes: {
    type: String,
    required: [true],
  },
  category: {
    type: String,
    required: [true],
  },
  type: {
    type: String,
    required: [true],
  },
  speakerName: {
    type: String,
    required: [true],
  },
  fileURL: {
    type: String,
    required: [true],
  },
  count: {
    type: Number,
    required: [true],
  }
});

// Creating a Model from that Schema
const PodcastSchema = mongoose.model("PodcastSchema", podcastSchema);

// Exporting the Model to use it in app.js File.
module.exports = PodcastSchema;