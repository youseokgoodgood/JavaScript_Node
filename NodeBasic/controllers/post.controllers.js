const path = require("path");

function getPost(req, res) {
  res.sendFile(
    path.join(__dirname, "..", "public", "images", "1641910812246.jpg")
  );
  //res.send("<div><h1>Post Title</h1><p>This is a post</p></div>");
}

module.exports = {
  getPost,
};
