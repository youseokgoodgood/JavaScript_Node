const express = require("express");
const usersRouters = express.Router();
const usersController = require("../controllers/users.controllers");

usersRouters.get("/", usersController.getUsers);
usersRouters.get("users/:userId", usersController.getUser);
usersRouters.post("/", usersController.postUser);

module.exports = usersRouters;
