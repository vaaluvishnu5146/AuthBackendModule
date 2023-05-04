/**
 * CREATING NODE SERVER FOR RECEING CLIENT REQUEST
 */
const express = require("express");
const app = require("./app");

const port = 5000;
const hostname = "localhost";
const node_server = express();

// INJECTING DATABASE INTOI NODE SERVER
require("./dbconfig");

// INJECTING APP SERVER INTO NODE SERVER
node_server.use("/", app);

node_server.listen(port, hostname, () => {
  console.log("Server started");
});
