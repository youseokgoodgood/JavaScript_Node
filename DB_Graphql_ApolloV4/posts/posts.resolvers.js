//resolver 파일은 최대한 간단하게 만드는게 제일좋음

const postsModel = require("./posts.model");

module.exports = {
  Query: {
    posts: () => {
      return postsModel.getAllPosts();
    },
    post: (_, args) => {
      return postsModel.getPostById(args.id);
    },
  },
  Mutation: {
    addNewPost: (_, args) => {
      return postsModel.addNewPost(args.id, args.title, args.description);
    },
  },
};
