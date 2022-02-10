const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');

const games = require('./models/games');
const users = require("./models/users")

const auth = require('./auth/auth');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);
app.use(passport.initialize());
app.use(passport.session());
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use(express.static('public'));


mongoose.connect('mongodb://localhost:27017/games', {useNewUrlParser: true});

const connection = mongoose.connection;

connection.on("error", ()  => {
    console.log("MongoDB connection failed!")
});

connection.on("open", () => {
    console.log("MongoDB connection successfully!");
    app.listen(8000, () => console.log('Express server running on port 8000'));
});
