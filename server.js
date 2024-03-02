const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const http = require("http");

const server = http.createServer(app);

const DB = process.env.DBURI.replace("<password>", process.env.DBPASSWORD);

mongoose
  .connect(DB)
  .then((con) => console.log("DB Connection successful."))
  .catch((err) => console.log("DB Error: ",err));

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`server started runnig on ${port}`));

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
