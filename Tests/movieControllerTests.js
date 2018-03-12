var should = require('should');
var sinon = require('sinon');

describe('Movie Controller Tests:', function() {

    describe('Post', function() {
        var Movie, movieController, res;
        beforeEach(function() {
            res = {
                status: sinon.spy(),
                json: sinon.spy()
            };

            Movie = function(movie) { this.save = function() {}; };
            movieController = require('../server/controllers/movieController')(Movie);
        });

        it('should not allow an empty title on post', function() {
            var req = {
                body: {
                    director: 'Jon'
                }
            };

            movieController.post(req, res);

            var errorResponse = {
                'success': false,
                'error': 'Title is required'
            };

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.json.calledWith(errorResponse).should.equal(true);
        });

        it('should add record on post', function() {
            var req = {
                body: {
                    title: 'Titanic',
                    director: 'James Cameron'
                }
            };

            movieController.post(req, res);
            res.status.calledWith(201).should.equal(true);
        });
    });

    describe('Get', function() {
        var res;
        beforeEach(function() {
            res = {
                status: sinon.spy(),
                json: sinon.spy()
            };
        });

        it('should set response status to 500 if db find return error', function() {
            var Movie = {
                'find': function(query, cb) {
                    cb('system error');
                }
            };

            var movieController = require('../server/controllers/movieController')(Movie);
            var res = {
                status: sinon.spy(),
                json: sinon.spy()
            };

            var req = {
                query: {}
            };

            movieController.get(req, res);
            res.status.calledWith(500).should.equal(true);
        });

        it('should able to get movies by genre', function() {
            var Movie = {
                'find': sinon.spy()
            };

            var movieController = require('../server/controllers/movieController')(Movie);
            var req = {
                query: {
                    genre: 'Fiction'
                }
            };

            movieController.get(req, res);
            Movie.find.calledWith(req.query).should.equal(true);
        });

        it('should set self link to movie response', function() {
            var movies = [{
                toJSON: function() {
                    return {
                        _id: "5aa637a6953be814218b4583",
                        title: 'Titanic',
                        director: 'James Cameron',
                        read: true
                    };
                }
            }, {
                toJSON: function() {
                    return {
                        _id: "5aa65e393f08162e2a8efcfb",
                        title: 'Iron Man',
                        director: 'Jon Favreau',
                        read: true
                    };
                }
            }];

            var Movie = {
                'find': function(query, cb) {
                    cb(null, movies);
                }
            };

            var movieController = require('../server/controllers/movieController')(Movie);

            var req = {
                headers: {
                    host: "localhost"
                },
                query: {
                    genre: 'Fiction'
                }
            };

            var response = {
                success: true,
                data: [{
                    _id: "5aa637a6953be814218b4583",
                    title: 'Titanic',
                    director: 'James Cameron',
                    read: true,
                    links: {
                        self: 'http://localhost/api/movies/5aa637a6953be814218b4583'
                    }
                }, {
                    _id: "5aa65e393f08162e2a8efcfb",
                    title: 'Iron Man',
                    director: 'Jon Favreau',
                    read: true,
                    links: {
                        self: 'http://localhost/api/movies/5aa65e393f08162e2a8efcfb'
                    }
                }]
            };

            movieController.get(req, res);
            res.json.calledWith(response).should.equal(true);
        });
    });
});