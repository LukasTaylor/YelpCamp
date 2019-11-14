//imports libraries for use
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground");

//set due to deprecation
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
//connects or creates a db called yelp_camp_db
mongoose.connect("mongodb://localhost/yelp_camp_db");

app.use(bodyParser.urlencoded({ extended: true }));
//allows you to exclude file extension in res.render()
app.set("view engine", "ejs");


//root route
app.get("/", function(req, res) {
  res.render("landing");
});

//in RESTful terms this is our INDEX route; show all campgrounds
app.get("/campgrounds", function(req, res) {
  //get all campgrounds in db
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      //render index.ejs to the screen and send data to ejs file
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

//in RESTful terms this is our CREATE route; add new campground to DB
app.post("/campgrounds", function(req, res) {
  //res.send("You hit the post route");
  //get data from form and add to to array. Grabbing it from the request body
  
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  //creates a new campground
  Campground.create(
    {
      name: name,
      image: image,
      description: description
    },
    function(err, newCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log("CREATED NEW CAMPGROUND");
        //prints newCampground data retrieved from db
        console.log(newCampground);
      }
    }
  );
  //redirect back to campgrounds page
  //although there are two "/campgrounds" the default is the get route
  res.redirect("/campgrounds");
});

//in RESTful terms this is our NEW route; show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

//in RESTful terms this is our SHOW route; shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID. "req.params.id" gives you the id from the request 
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        console.log(err);
      } else {
        //render show template with a campground find by ids
        res.render("show", {campground: foundCampground});
      }
    });
});

app.listen(3000, function() {
  console.log("YelpCamp server has started");
});
