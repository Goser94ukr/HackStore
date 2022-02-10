const mongoose = require("mongoose");
let User = mongoose.model('User');
const passport = require('passport');


exports.user_create = (req, res) => {
    console.log('121')
    passport.authenticate('signup',{session: false},
        async (err, user, next) => {
            console.log("req.body")
            res.json({
                message: 'Signup successful',
                user: req.user
            })
        })
};

