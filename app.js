const express = require("express"); // web framework for Node.js
const morgan = require("morgan"); // HTTP request logger middleware for node.js
const mongosanitize = require("express-mongo-sanitize"); // sanitizes the received data, and remove any offending keys, or replace the characters with a 'safe' one.
const bodyParser = require("body-parser"); //Middleware for Parsing incoming request bodies

const cors = require("cors");
const router = require("./routes");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(mongosanitize());

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(router);

module.exports = app;
