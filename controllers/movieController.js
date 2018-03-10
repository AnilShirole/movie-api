var movieController = function(Movie) {

    var post = function(req, res) {
        var movie = new Movie(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        } else {
            movie.save();
            res.status(201);
            res.send(movie);
        }
    };

    var get = function(req, res) {

        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Movie.find(query, function(err, movies) {

            if (err)
                res.status(500).send(err);
            else {

                var returnMovies = [];
                movies.forEach(function(element, index, array) {
                    var newMovie = element.toJSON();
                    newMovie.links = {};
                    newMovie.links.self = 'http://' + req.headers.host + '/api/movies/' + newMovie._id
                    returnMovies.push(newMovie);
                });
                res.json(returnMovies);
            }
        });
    };

    return {
        post: post,
        get: get
    };
};

module.exports = movieController;