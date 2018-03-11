var apiResponse = require('../common/apiResponse');

var movieController = function(Movie) {

    var post = function(req, res) {
        var movie = new Movie(req.body);
        var jsonResponse;
        if (!req.body.title) {
            res.status(400);
            jsonResponse = apiResponse.createResposne('Title is required');
        } else {
            movie.save();
            res.status(201);
            jsonResponse = apiResponse.createResposne(null, movie);
        }
        res.json(jsonResponse);
    };

    var get = function(req, res) {

        var query = {};
        var jsonResponse;
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Movie.find(query, function(err, movies) {

            if (err) {
                res.status(500);
                jsonResponse = apiResponse.createResposne(err);
            } else {

                var returnMovies = [];
                movies.forEach(function(element, index, array) {
                    var newMovie = element.toJSON();
                    newMovie.links = {};
                    newMovie.links.self = 'http://' + req.headers.host + '/api/movies/' + newMovie._id
                    returnMovies.push(newMovie);
                });
                jsonResponse = apiResponse.createResposne(null, returnMovies);
            }
            res.json(jsonResponse);
        });
    };

    return {
        post: post,
        get: get
    };
};

module.exports = movieController;