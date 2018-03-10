var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://127.0.0.1:27017/movieAPI');
var Movie = require('./models/movieModel');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

movieRouter = require('./Routes/movieRoutes')(Movie);
app.use('/api/movies', movieRouter);


app.get('/', function(req, res) {
    res.send('welcome to my API!');
});

app.listen(port, function() {
    console.log('Gulp is running my app on  PORT: ' + port);
});

module.exports = app;