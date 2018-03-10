var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var movieModel = new Schema({
    title: {
        type: String
    },
    director: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model('movie', movieModel);