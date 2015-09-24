var mongoose = require('mongoose'),
    crypto   = require('crypto');

var ProjectSchema = new mongoose.Schema({
  location: String,
  latitude: Number,
  longitude: Number,
  description: String,
  expirationDate: Date,
  seeker: {
    type: Number,
    required: true,
    ref: User

  },
  pilot:{
    type: Number,
    ref: User
  } 
});

ProjectSchema.pre('save', function(next){
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);
