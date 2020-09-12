let express = require("express");

let PORT = process.env.PORT || 8080;

var app = express();

//serve static content
app.use(express.static("public"));

//parse the app body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//import handlebars
let hbs = require("express-handlebars");

app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//import routes to give server access
let routes = require("./controllers/burritos_controller.js");

app.use(routes);

//spin up server
app.listen(PORT, function() {
    //logs the server connection
    console.log("Server listening on: http://localhost:" + PORT);
});