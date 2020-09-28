import express, { Request, Response } from "express";
import "./configs/connection";
import {
  register,
  login,
  getUsers,
  token,
  getUser,
  update
} from "./controllers/UserController";
import { isUserAuth } from "./middlewares/isUserAuth";

const cors = require("cors");
const winston = require("winston");
const expressWinston = require("express-winston");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

// Logger format with meta data
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: true,
    ignoreRoute: function(req: Request, res: Response) {
      return false;
    }
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Khushil's App");
});

app.post("/users/register", register);
app.post("/users/login", login);
app.post("/users/token", token);
app.use(isUserAuth);
app.get("/users", getUsers);
app.get("/users/:id", getUser);
app.put("/users/:id", update);

app.listen(port, (err: Error) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
