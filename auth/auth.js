const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/users');

passport.use(
    `signup`,
    new LocalStrategy (
        {
            loginField: "login",
            emailField: "email",
            passwordField: "password",
            // passReqToCallback: true
        },
        async (login, email, password, done) => {
            console.log("AUTH")
            try {
                console.log("SDS")
                const user = await UserModel.create({ login, email, password });
                return done(null, user);
            } catch (error) {
                console.log("DDD")
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {
            loginField: 'login',
            passwordField: 'password'
        },
        async (login, password, done) => {
            try {
                console.log('Hello')
                const user = await UserModel.findOne({ login });
                if (!user) {
                    console.log("User not found")
                    return done(null, false, { message: 'User not found' });
                }
                const validate = await user.isValidPassword(password);
                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }
                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);