"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongodb = require("mongodb");
var fs = require("fs");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
//db class declaration
var DataAccess = /** @class */ (function () {
    //construct by connecting
    function DataAccess() {
        var _this = this;
        //when adding a save we call this promise, the idea is
        //its like a function that takes in the req, and returns
        //the promise, the promise will return either resolved
        //or rejected
        this.addSavePromise = function (req) {
            return new Promise(function (resolve, reject) {
                var save = {
                    sName: req.body.sName,
                    type: req.body.type,
                    description: req.body.description,
                    isPrivate: req.body.isPrivate,
                    isBlood: req.body.isBlood,
                    downloads: 0,
                    upVotes: 0,
                    dnVotes: 0,
                    uName: req.body.uName
                }; //inserts check against prime keys automagically, no need for extra logic
                _this.db.collection('saves').insertOne(save, function (err, save) {
                    if (err) {
                        reject(err.code); //if we fail/error reject the request and tell browser
                    }
                    else {
                        resolve('Save inserted'); //baller
                    }
                });
            });
        };
        //same same as above but for adding users
        this.addUserPromise = function (req) {
            return new Promise(function (resolve, reject) {
                //build salt and hash upfront, if we fail we'll have to re-make them
                //but it shouldn't be too much issue
                //if performance is troublesome later maybe move it into the successful
                //insertion else{} I just don't want to move and break it
                var salt = crypto.randomBytes(16).toString('hex');
                var hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');
                var user = {
                    uName: req.body.uName,
                    totalDownloads: 0,
                    totalUpvotes: 0,
                    totalDownvotes: 0,
                    avatar: '.',
                    email: req.body.email,
                    salt: salt,
                    hash: hash
                };
                var date = new Date();
                date.setDate(date.getDate() + 7);
                var token = jwt.sign({
                    uName: user.uName,
                    totalDownloads: user.totalDownloads,
                    totalUpvotes: user.totalUpvotes,
                    totalDownvotes: user.totalDownvotes,
                    exp: (date.getTime() / 1000)
                }, fs.readFileSync('secret', 'utf8'));
                _this.db.collection('users').insertOne(user, function (err, save) {
                    if (err) {
                        reject(err.code);
                    }
                    else {
                        resolve(token);
                    }
                });
            });
        };
        //when we login we need to authenticate basically the same as above,
        //we default to not allowing the user in. this is important cybersec
        //stuff. mega secure, badass.
        this.loginPromise = function (req) {
            return new Promise(function (resolve, reject) {
                var bool = false;
                _this.db.collection('users').findOne({ uName: req.body.uName }, function (err, user) {
                    if (err) {
                        reject(err);
                    }
                    else if (!user) {
                        reject('User not found'); //'User not found'
                    }
                    else {
                        var hash = crypto.pbkdf2Sync(req.body.password, user.salt, 1000, 64, 'sha512').toString('hex');
                        bool = user.hash === hash;
                        if (bool) {
                            var date = new Date();
                            date.setDate(date.getDate() + 7);
                            var token = jwt.sign({
                                uName: user.uName,
                                totalDownloads: user.totalDownloads,
                                totalUpvotes: user.totalUpvotes,
                                totalDownvotes: user.totalDownvotes,
                                exp: (date.getTime() / 1000)
                            }, fs.readFileSync('secret', 'utf8'));
                            resolve(token);
                        }
                        else {
                            reject('Incorrect password'); //'Incorrect password'
                        }
                    }
                });
            });
        };
        this.url = (fs.readFileSync('mongoString.txt', 'utf8'));
        this.mongoConnect();
    }
    //we do just about everything asynchronously, the promises below
    //are called asyc, this is declared async
    DataAccess.prototype.mongoConnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mongo = new mongodb.MongoClient(this.url, { useNewUrlParser: true });
                        //try to connect, then assign the db to variables
                        return [4 /*yield*/, this.mongo.connect(function (err, client) {
                                if (client.isConnected()) {
                                    _this.db = client.db('test');
                                    _this.client = client;
                                    console.log("Connected to mongodb");
                                }
                                if (err) {
                                    console.log('Mongo connection error:');
                                    console.error(err);
                                }
                            })];
                    case 1:
                        //try to connect, then assign the db to variables
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //this happens anyway, i don't need this...
    //i can't not have it though, i can't sleep...
    DataAccess.prototype.mongoClose = function () {
        this.mongo.close();
    };
    return DataAccess;
}());
exports.DataAccess = DataAccess;
