var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
  location: String,
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  description: String,
  expirationDate: Date,
  title: String,
  creator: String
});
/*
username: {
  type: String,
  required: true,
  unique: true
},
*/

module.exports = mongoose.model('Project', ProjectSchema);


// Mongoose comes with the .create and .findOne methods already in the box.
// These are used in the projectController so we didn't need to write them and they
// won't exist in written format.
