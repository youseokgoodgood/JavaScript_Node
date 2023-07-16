//모듈화 전
// module.exports = [
//   {
//     id: "comment1",
//     text: "It is a first comment",
//     likes: 1,
//   },
// ];

//모듈화 후
const comments = [
  {
    id: "comment1",
    text: "It is a first comment",
    likes: 1,
  },
  {
    id: "comment2",
    text: "It is a first comment",
    likes: 10,
  },
];

const getAllComments = () => {
  return comments;
};

const getCommentsByLikes = (minLikes) => {
  return comments.filter((Comment) => Comment.likes >= minLikes);
};

const addNewComment = (id, text) => {
  const newComment = {
    id,
    text,
  };

  comments.push(newComment);

  return newComment;
};

module.exports = {
  getAllComments,
  getCommentsByLikes,
  addNewComment,
};
