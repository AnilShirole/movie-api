var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express');

var db = mongoose.connect('mongodb://127.0.0.1:27017/movieAPI');
var Movie = require('./server/models/movieModel');
var logger = require('./server/common/log.conf');
var swaggerDocument = require('./server/common/swagger/swagger.json');

var app = express();
var port = process.env.PORT || 3000;

app.use(logger);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var movieRouter = require('./server/Routes/movieRoutes')(Movie);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/movies', movieRouter);


app.listen(port, function() {
    console.log('Gulp is running my app on  PORT: ' + port);
});

module.exports = app;