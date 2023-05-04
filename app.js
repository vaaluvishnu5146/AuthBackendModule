/**
 * CREATING APP SERVER THAT SERVES THE CLIENT REQUESTED DATA
 */
const express = require("express");
const bodyparser = require("body-parser");
const app_server = express();

// IMPORTING CONTROLLERS
const signup_controller = require("./Controllers/Signup.controller");
const signin_controller = require("./Controllers/Login.controller");

// CONFIGURING MIDDLE WARE
app_server.use(bodyparser.json());
app_server.use(bodyparser.urlencoded({ extended: true }));

//INJECTING CONTROLERS INTO app_server
app_server.use("/api/v1/auth/signup", signup_controller);
app_server.use("/api/v1/auth/login", signin_controller);

module.exports = app_server;
