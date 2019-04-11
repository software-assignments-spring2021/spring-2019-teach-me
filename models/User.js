const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  introduction: {
    type: String
  },
  sumOfRatingAsInstructor: {
    type: Number,
    default: -1
  },
  numOfRatingAsInstructor: {
    type: Number,
    default: -1
  },
  sumOfRatingAsLearner: {
    type: Number,
    default: 0
  },
  numOfRatingAsLearner: {
    type: Number,
    default: 0
  }
});
module.exports = User = mongoose.model("users", UserSchema);