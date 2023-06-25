const express = require("express");
const postsRouters = express.Router();
const postController = require("../controllers/post.controllers");

postsRouters.get("/", postController.getPost);

module.exports = postsRouters;
