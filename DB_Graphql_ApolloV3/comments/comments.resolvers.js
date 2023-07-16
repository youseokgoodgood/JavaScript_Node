//resolver 파일은 최대한 간단하게 만드는게 제일좋음

const commentModel = require("./comments.model");

module.exports = {
  Query: {
    comments: () => {
      return commentModel.getAllComments();
    },
    commentsByLikes: (_, args) => {
      return commentModel.getCommentsByLikes(args.minLikes);
    },
  },
  Mutation: {
    addNewComment: (_, args) => {
      return commentModel.addNewComment(args.id, args.text);
    },
  },
};
