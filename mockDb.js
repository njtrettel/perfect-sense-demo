const _ = require('lodash');
const posts = require('./mockData').posts;

const mockComment = {
  postId: 'grayson-highlands',
  author: 'yosemiteKid16',
  content: 'Wow! Who knew the East Coast had such great rock?!',
  date: {
    year: '2018',
    month: '02',
    day: '02'
  }
};

const database = {
  posts,
  comments: [mockComment]
};

const getPostByDateAndTitle = (date, title) => {
  const post = _.find(database.posts, { date, id: title });
  return new Promise((resolve, reject) => {
    if (!post) {
      setTimeout(() => reject({ message: 'Post not found' }), 250);
    }
    setTimeout(() => resolve(post), 250);
  });
};

const getPostsByCategory = (category) => {
  const posts = _.filter(database.posts, { category });
  return new Promise((resolve, reject) => {
    if (!posts) {
      setTimeout(() => reject({ message: 'No posts found' }), 250);
    }
    setTimeout(() => resolve({ posts }), 250);
  });
};

const getCommentsByPost = (postId) => {
  const comments = _.filter(database.comments, { postId });
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ comments }), 250);
  });
};

const commentOnPost = (postId, comment) => {
  console.log('commenting on post', comment);
  const newComments = _.concat(database.comments, comment);
  database.comments = newComments;
  const commentsForPost = _.filter(database.comments, { postId });
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ comments: commentsForPost }), 250);
  });
};

module.exports = {
  getPostByDateAndTitle,
  getPostsByCategory,
  getCommentsByPost,
  commentOnPost
};
