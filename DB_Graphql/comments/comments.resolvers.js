//resolver 파일은 최대한 간단하게 만드는게 제일좋음

module.exports = {
  Query: {
    comments: (parent) => {
      return parent.comments;
    },
  },
};
