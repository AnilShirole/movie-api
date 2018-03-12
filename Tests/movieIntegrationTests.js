var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Movie = mongoose.model('movie'),
    agent = request.agent(app);


describe('Movie Crud Test', function() {
    it('Should allow a movie to be posted and return a read and data', function(done) {
        var moviePost = { title: 'new Movie', director: 'Jon', genre: 'Fiction' };

        agent.post('/api/movies')
            .send(moviePost)
            .expect(200)
            .end(function(err, results) {
                results.body.should.have.property('data');
                results.body.should.have.property('success');
                done();
            });
    });

    afterEach(function(done) {
        Movie.remove().exec();
        done();
    });
});