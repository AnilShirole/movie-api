var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://127.0.0.1:27017/movieAPI');
var Movie = require('./models/movieModel');
var logger = require('./common/log.conf');

var app = express();
var port = process.env.PORT || 3000;

app.use(logger);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var movieRouter = require('./Routes/movieRoutes')(Movie);
app.use('/api/movies', movieRouter);

app.get('/', function(req, res) {
    res.send('welcome to my API!');
});

app.listen(port, function() {
    console.log('Gulp is running my app on  PORT: ' + port);
});

module.exports = app;