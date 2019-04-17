"use strict";
exports.__esModule = true;
var http = require("http");
var express = require("express");
var helmet = require("helmet");
var mongodb = require("mongodb");
var compression = require("compression");
var url = 'mongodb://localhost:27017/myproject';
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.app.use(helmet());
        this.app.use(compression());
        this.buildRoutes();
        this.mongoConnect();
        var httpServer = http.createServer(this.app);
        httpServer.listen(8080, function () {
            console.log('HTTP Server running on port 8080');
        });
        console.log('closing');
    }
    App.prototype.buildRoutes = function () {
        this.router = express.Router();
        this.app.use(express.static(__dirname + '/dist/armok'));
    };
    App.prototype.mongoConnect = function () {
        this.mongo = new mongodb.MongoClient(url);
        this.mongo.connect()
            .then(function (db) {
            if (db.isConnected()) {
                console.log('Connected mongo');
            }
        })["catch"](function (err) {
            console.log('Error: ');
            console.error(err);
        });
    };
    return App;
}());
exports.App = App;
var app = new App();
