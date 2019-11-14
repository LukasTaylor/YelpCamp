var mongoose = require("mongoose");

//setup schema aka the structure of the db
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
  });
  
  //creates an object model of the schema. This gives you db functionality
  var Campground = mongoose.model("Campground", campgroundSchema);
  
  //export a single campground (think of return statement)
  module.exports = Campground;