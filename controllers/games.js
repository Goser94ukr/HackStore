const mongoose = require("mongoose");
let Games = mongoose.model('Games');



exports.games_create = (req, res) => {
    let games = new Games ({

        title: req.body.title,
        description: req.body.description,
        developers: req.body.developers,
        publishers: req.body.publishers,
        gameModels: req.body.gameModels,
        genre: req.body.genre,
        series: req.body.series,
        platforms: req.body.platforms,
        releaseDate: req.body.releaseDate,
    });
    games.save()
        .then(games => {
            res.status(200).json({"status": 'Added successfully', games: games});
        })
        .catch(err => {
            res.status(400).send("Failed");
        });

};


exports.games_update = (req, res) => {
    Games.findById(req.params.id, (err, games) => {
        if(!games) {
            throw new Error("Could not load document");
        }
        else {
            games.title = req.body.title;
            games.description = req.body.description;
            games.developers = req.body.developers;
            games.publishers = req.body.publishers;
            games.gameModels = req.body.gameModels;
            games.genre = req.body.genre;
            games.series = req.body.series;
            games.platforms = req.body.platforms;
            games.releaseDate = req.body.releaseDate;

            games.save((error, games) => {
                res.json({status: 'Update done', games: games});

            });
        }
    });
};

exports.gamesOne_delete = (req, res) => {
    console.log("Impact")
    const id = req.body.toString();
    Games.findById(req.params.id, (err, game) => {
        if(!game) {
            console.log("Oops")
            res.json({status: "Failed"})
        } else {
            console.log("game")
            game.remove()
                .then(() => {
                    res.json( { success: "success" })
                })
                .catch((err) => {
                    res.json( { failed: new Error })
                })
        }
    })
};

exports.gamesMany_delete = (req, res) => {
    const ids = req.body

    Games.deleteMany({ "_id": {$in: ids}}, (err, result) => {
        if (err) {
            console.log("Oops")
            res.json({status: "Failed"})
        } else {
            console.log("Success");
            res.json( { success: "success" })
        }
    })

}

exports.games_list = (req, res) => {
    Games.find((err, games) => {
        if(err) {
            console.log(err);
        }
        res.json(games);
    })
}
