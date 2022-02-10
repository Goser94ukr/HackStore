// let server = require("../server")
let http_mocks = require('node-mocks-http');
let should = require('chai').should();

let request = http_mocks.createRequest();
let response = http_mocks.createResponse({
    eventEmitter: require("events").EventEmitter
});

let testNew, server, gamesController, Games;

// let testBody = {
//     title: 'The Elder Scrolls V: Skyrim',
//     description: 'Skyrim',
//     developers: 'Bethesda Game Studios',
//     publishers: 'Bethesda Softworks',
//     gameModels: 'Single player',
//     genre: ['Adventure', 'Role-playing (RPG)'],
//     series: 'The Elder Scrolls',
//     platforms: ["Xbox 360", 'PS3', 'PC'],
//     releaseDate: "11.11.11",
// };

let testBody = [
    {
        title: '1',
        description: '1',
        developers: '1',
        publishers: '1',
        gameModels: '1',
        genre: ['1'],
        series: '1',
        platforms: ['1'],
        releaseDate: "11",
    },
    {
        title: '2',
        description: '2',
        developers: '2',
        publishers: '2',
        gameModels: '2',
        genre: ['2'],
        series: '2',
        platforms: ['2'],
        releaseDate: "2",
    },
    {
        title: '3',
        description: '3',
        developers: '3',
        publishers: '3',
        gameModels: '3',
        genre: ['3'],
        series: '3',
        platforms: ['3'],
        releaseDate: "3",
    }
]


function initTest()  {
    server  = require('../server');
    gamesController  = require('../controllers/games.js');
    Games  = require('../models/games');
}

before(async function() {
    initTest();
});

after(async function() {
    try {
        if (testNew) {
            await Games.deleteOne({_id: testNew._id});
        }
    } catch (error) {
        throw error;
    }
});

describe ("Games controller", () => {
    it("Create", (done) => {
        request.body = testBody;

        response.on('end', () => {
            let data = JSON.parse(response._getData());
            should.exist(data.games);
            data.games.should.be.an.instanceOf(Object);
            testNew = data.games;
            done()
        });

        gamesController.games_create(request, response);

    });

    it("Update without error", () => {

        request.body = testBody;
        request.params = { id: testNew._id };

        request.games = testBody;
        request.games.save = function (callback) {
            return callback();
        };
        // console.log(response);
        response.on("end", () => {
            let data = JSON.parse(response._getData());
            // should.exist(data.games);
            // data.games.should.be.an.instanceOf(Object);
            data.games.should.be.true();
            done();
        });
        gamesController.games_update(request, response);


    });

    it("Update with error", () => {
        request.body = testBody;
        request.params = { id: testNew._id};

        request.games = testBody;
        request.games.save = function (callback)  {
            return callback(new Error("test error"))
        };

        response.on("end", () => {
            let data = JSON.parse(response._getData());
            data.games.should.be.false();
            done();
        });
        gamesController.games_update(request, response);
    });

    it("Delete without error", () => {
        request.games = testBody;
        request.games.remove = function (callback) {
            return callback
        };

        response.on("end", () => {
            let data = JSON.parse(response._getData());

            data.success.should.be.true();
            done();
        });
        gamesController.games_delete(request, response);
    });

    it("Delete with error", () => {
        request.games = testBody;
        request.games.remove = function (callback) {
            return callback(new Error("test error"))
        };

        response.on("end", () => {
            let data = JSON.parse(response._getData());
            data.success.should.be.false();
            done();
        });
        gamesController.games_delete(request, response);
    });

    it("List", () => {

        response.on("end", () => {
            let data = JSON.parse(response._getData());

            data.games.should.be.an.instanceOf(Object);
            done();
        });
        gamesController.games_list(request, response);


    })
});