"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("./configs/connection");
var UserController_1 = require("./controllers/UserController");
var isUserAuth_1 = require("./middlewares/isUserAuth");
var cors = require("cors");
var winston = require("winston");
var expressWinston = require("express-winston");
var app = express_1.default();
var port = 3000;
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: false
}));
// Logger format with meta data
app.use(expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: true,
    ignoreRoute: function (req, res) {
        return false;
    }
}));
app.get("/", function (req, res) {
    res.send("Khushil's App");
});
app.post("/users/register", UserController_1.register);
app.post("/users/login", UserController_1.login);
app.post("/users/token", UserController_1.token);
app.use(isUserAuth_1.isUserAuth);
app.get("/users", UserController_1.getUsers);
app.get("/users/:id", UserController_1.getUser);
app.put("/users/:id", UserController_1.update);
app.listen(port, function (err) {
    if (err) {
        return console.error(err);
    }
    return console.log("server is listening on " + port);
});
