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
var express = require("express");
var expressJwt = require("express-jwt");
var fs = require("fs");
var multer = require("multer");
var dataAccess_1 = require("./dataAccess");
//build router and pull in the db
var data;
data = new dataAccess_1.DataAccess();
var router = express.Router();
exports.router = router;
var mySecret = fs.readFileSync('secret', 'utf8');
//multer that connects with gridFS, upload.single
//is called on the route, then the upload uses the
//storage engine declared in dataAccess
var storage = data.storage;
var upload = multer({ storage: storage });
//this is an automated JWT checker to make
//sure no one is impersonating anyone,
//anonymous users may still connect
var checkifAuth = expressJwt({
    secret: mySecret,
    credentialsRequired: false
});
//prolly don't need this, i don't wanna remove it though
router.use(function (req, res, next) {
    next();
});
//static file stuff
router.get('/', function (req, res) {
    res.sendFile(__dirname, '/dist/armok/index.html');
});
//api magic, /api/register directs here
router.put('/register', function (req, res) {
    var _this = this;
    try { //try/catch a promise to call the db for the insert
        var callAddUserPromise = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (data.addUserPromise(req))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); }; //declaration above, call below
        callAddUserPromise(req).then(function (result) {
            res.status(200).json(result);
        })["catch"](function (reject) {
            if (reject === 11000) {
                res.status(409).json('Save name exists');
            }
            else {
                res.status(500);
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
    // let strToken = data.addUser(req)
    // res.status(200).json({
    //     token: strToken
    // })
});
//this is where /api/login goes, very similar to above
router.put('/login', function (req, res) {
    var _this = this;
    try {
        var callLoginPromise = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (data.loginPromise(req))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
        callLoginPromise(req).then(function (result) {
            res.status(200).json(result);
        })["catch"](function (reject) {
            if (reject === 'User not found') {
                res.status(404).json(reject);
            }
            else {
                res.status(401).json(reject);
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json(null);
    }
});
//same same but /api/upload/save, used for new saves
router.put('/upload/save', checkifAuth, function (req, res) {
    var _this = this;
    try {
        var callAddSavePromise = function (req) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (data.addSavePromise(req))];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        }); };
        callAddSavePromise(req).then(function (result) {
            res.status(200).json(result);
        })["catch"](function (reject) {
            if (reject === 11000) {
                res.status(409).json('Save name exists');
            }
            else {
                res.status(500);
            }
        });
    }
    catch (e) {
        console.log(e);
        res.status(500);
    }
});
router.put('/upload/file/', upload.any(), function (req, res) {
    res.json(req.files[0].uploadDate);
    res.status(200);
});
