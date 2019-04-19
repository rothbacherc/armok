"use strict";
exports.__esModule = true;
var http = require("http");
var express = require("express");
var helmet = require("helmet");
var compression = require("compression");
var dataAccess_1 = require("./dataAccess");
var url = 'mongodb://localhost:27017/myproject';
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.app.use(helmet());
        this.app.use(compression());
        this.buildRoutes();
        this.data = new dataAccess_1.DataAccess();
        var httpServer = http.createServer(this.app);
        httpServer.listen(8080, function () {
            console.log('HTTP Server running on port 8080');
        });
    }
    App.prototype.buildRoutes = function () {
        this.router = express.Router();
        this.app.use(express.static(__dirname + '/dist/armok'));
    };
    return App;
}());
exports.App = App;
var app = new App();
