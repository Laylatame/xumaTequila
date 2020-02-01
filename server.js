let express = require("express");
let bodyParser = require("body-parser");

let app = express(); //Set up the endpoints
let jsonParser = bodyParser.json();
var path = require("path");

//app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname, "/public")));

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", function(req, res) {
  res.render("index");
});

app.get("/index", function(req, res) {
  res.render("index");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/shop", function(req, res) {
  res.render("shop");
});

app.get("/faqs", function(req, res) {
  res.render("faqs");
});

app.get("/cart", function(req, res) {
  res.render("cart");
});

app.listen("8080", () => {
  //When someone accesses the endpoint through the port 8080, something is going to be executed
  console.log("Our app is running on port 8080");
});
