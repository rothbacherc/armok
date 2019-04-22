"use strict";
exports.__esModule = true;
var express = require("express");
var dataAccess_1 = require("./dataAccess");
var router = express.Router();
exports.router = router;
var data;
data = new dataAccess_1.DataAccess();
router.use(function timeLog(req, res, next) {
    next();
});
router.get('/', function (req, res) {
    res.sendFile(__dirname, '/dist/armok/index.html');
});
router.put('/register', function (req, res) {
    var token = data.addUser(req);
    res.status(200).json({
        token: token
    });
});
