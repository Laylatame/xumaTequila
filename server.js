let express = require("express"); 
let bodyParser = require('body-parser');

let app = express(); //Set up the endpoints
let jsonParser = bodyParser.json();


//app.use(bodyParser.urlencoded({extended : true}));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.get('/index.ejs', function(req, res) {
    res.render('index');
});

app.get('/shop.ejs', function(req, res) {
    res.render('shop');
});

app.get('/faqs.ejs', function(req, res) {
    res.render('faqs');
});



app.listen("8080", () => {
    //When someone accesses the endpoint through the port 8080, something is going to be executed
    console.log("The app is running on port 8080");

});