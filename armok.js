"use strict";
exports.__esModule = true;
var http = require("http");
var express = require("express");
var helmet = require("helmet");
var compression = require("compression");
var bodyParser = require("body-parser");
var api_1 = require("./api");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use('/api', api_1.router); //calls the built routes in api.ts
        this.app.use(express.static(__dirname + '/dist/armok'));
        var httpServer = http.createServer(this.app);
        httpServer.listen(8080, function () {
            console.log('HTTP Server is totally running on port 8080');
        });
    }
    return App;
}());
exports.App = App;
var app = new App();
