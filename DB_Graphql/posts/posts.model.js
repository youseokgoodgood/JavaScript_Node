//모듈화 전

// module.exports = [
//   {
//     id: "post1",
//     title: "It is a first post",
//     description: "It is a first description",
//     comments: [
//       {
//         id: "comment1",
//         text: "It is a first comment",
//         likes: 1,
//       },
//     ],
//   },
//   {
//     id: "post2",
//     title: "It is a second post",
//     description: "It is a second description",
//     comments: [],
//   },
// ];

//모듈화 후
const posts = [
  {
    id: "post1",
    title: "It is a first post",
    description: "It is a first description",
    comments: [
      {
        id: "comment1",
        text: "It is a first comment",
        likes: 1,
      },
    ],
  },
  {
    id: "post2",
    title: "It is a second post",
    description: "It is a second description",
    comments: [],
  },
];

const getAllPosts = () => {
  return posts;
};

const getPostById = (id) => {
  return posts.find((post) => post.id === id);
};

const addNewPost = (id, title, description) => {
  const newPost = {
    id,
    title,
    description,
    comments: [],
  };

  posts.push(newPost);

  return newPost;
};

module.exports = {
  getAllPosts,
  getPostById,
  addNewPost,
};
