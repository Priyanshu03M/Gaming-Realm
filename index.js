const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("views"));

mongoose.connect("mongodb://localhost:27017/UserlistDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema)

app.get("/", function(req, res){
    res.render('index');
})

app.post("/", function(req, res){
    const user = new User({
        email: req.body.emailaddress,
        password: req.body.auth
    });
    user.save().then(function (doc) {
        console.log("User is successful");
    }).catch(function (error) {
        console.log(error);
    });
    console.log(req.body.auth);
    console.log(req.body.emailaddress);
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
});
