var express = require('express');


var routes = function(Movie) {
    var movieRouter = express.Router();

    var movieController = require('../controllers/movieController')(Movie);
    movieRouter.route('/')
        .post(movieController.post)
        .get(movieController.get);

    movieRouter.use('/:movieId', function(req, res, next) {
        Movie.findById(req.params.movieId, function(err, movie) {
            if (err)
                res.status(500).send(err);
            else if (movie) {
                req.movie = movie;
                next();
            } else {
                res.status(404).send('no movie found');
            }
        });
    });
    movieRouter.route('/:movieId')
        .get(function(req, res) {

            var returnMovie = req.movie.toJSON();

            returnMovie.links = {};
            var newLink = 'http://' + req.headers.host + '/api/movies/?genre=' + returnMovie.genre;
            returnMovie.links.FilterByThisGenre = newLink.replace(' ', '%20');
            res.json(returnMovie);

        })
        .put(function(req, res) {
            req.movie.title = req.body.title;
            req.movie.director = req.body.director;
            req.movie.genre = req.body.genre;
            req.movie.read = req.body.read;
            req.movie.save(function(err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.movie);
                }
            });
        })
        .patch(function(req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.movie[p] = req.body[p];
            }

            req.movie.save(function(err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.movie);
                }
            });
        })
        .delete(function(req, res) {
            req.movie.remove(function(err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    return movieRouter;
};

module.exports = routes;