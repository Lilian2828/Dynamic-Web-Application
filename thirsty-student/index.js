// Import express and ejs
var express = require ('express')
var ejs = require('ejs')
var bodyParser= require ('body-parser')
var validator = require("email-validator");
// Create the express application object
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }))

// Define our Variables
var shopData = {shopName: "Drinks for Us",
productCategories:["Beer", "Wine", "Soft Drinks", "Hot Drinks"],
ManagersandLocations: ["Mr Jack Smiths - 34 Link Way",
                       "Mr Cristiano Ronaldo - 5 Farm Way",
                       "Mr Andre Mars - 7 Old Road"]};

// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views', __dirname + '/views');
// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');
// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile);

// Handle our routes
app.get('/',function(req,res){
    res.render('index.html', shopData);
});

app.get('/about',function(req,res){
    res.render('about.html', shopData);
});

app.get('/search',function(req,res){
    res.render("search.html", shopData);
});
app.get('/search-result', function (req, res) {
    // TODO: search in the database
    res.send("You searched for: " + req.query.keyword);
   });
   
   app.get('/register', function (req,res) {
    res.render('register.html',shopData);
   });
   
   app.post('/registered', function (req,res) {
    // saving data in database
    if(validator.validate(req.body.email)) {
        res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!' +' ' + 'We will send an email to you at' + ' ' + req.body.email); 
    }
   else 
   res.send('Invalid email');
});
   
// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`)) ;

