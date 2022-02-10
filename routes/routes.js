const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const games_controller = require("../controllers/games");

router.get("/games", games_controller.games_list);

router.post('/games/create', games_controller.games_create);

router.put('/games/update/:id', games_controller.games_update);

router.delete('/games/delete/:id', games_controller.gamesOne_delete);

router.delete('/games/delete', games_controller.gamesMany_delete);


// router.post(
//     '/signup',
//     async(req, res, next) => {
//     console.log(`router signup`);
//     passport.authenticate('signup',{session: false},
//         async (err, user, next) => {
//             res.json({
//                 message: 'Signup successful',
//                 user: req.user
//             })
//         })
//     }
// )
// router.post(
//     '/signup',
//     passport.authenticate('signup', {session: false},
//         async (req, res, next) => {
//         res.json({
//             message: 'Signup successful',
//             user: req.user
//         })
//         })
// );
router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user
        });
    }
);

router.post(
    '/login',
    async (req, res, next) => {
        passport.authenticate(
            'login',
            async (err, user, info) => {
                try {
                    if (err || !user) {
                        const error = new Error('An error occurred.');
                        return next(error);
                    }
                    req.login(
                        user,
                        { session: false },
                        async (error) => {
                            if (error) return next(error);
                            const body = { _id: user._id, email: user.email };
                            const token = jwt.sign({ user: body }, 'TOP_SECRET');
                            return res.json({ token });
                        }
                    );
                } catch (error) {
                    return next(error);
                }
            })
        (req, res, next);
    }
);


module.exports = router;