const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GamesSchema = new Schema({
    title: String,
    description: String,
    developers: String,
    publishers: String,
    gameModels: String,
    genre: [],
    series: String,
    platforms: [],
    releaseDate: String,
});

module.exports = mongoose.model('Games', GamesSchema);