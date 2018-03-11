var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://127.0.0.1:27017/movieAPI');
var Movie = require('./server/models/movieModel');
var logger = require('./server/common/log.conf');
var swagger = require('./server/common/swagger');

var app = express();
var port = process.env.PORT || 3000;

app.use(logger);
app.use(express.static('./server/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var movieRouter = require('./server/Routes/movieRoutes')(Movie);

app.use('/api/movies', movieRouter);

swagger.configureSwagger(app, function(swaggerApp) {
    app = swaggerApp;
});


app.listen(port, function() {
    console.log('Gulp is running my app on  PORT: ' + port);
});

module.exports = app;