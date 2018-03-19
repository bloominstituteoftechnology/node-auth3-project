/* eslint-disable */
const fs = require('fs');

const Post = require('./post.js');

let savedPosts = null;

const readPosts = () => {
  // cache posts after reading them once
  if (!savedPosts) {
    const contents = fs.readFileSync('posts.json', 'utf8');
    savedPosts = JSON.parse(contents);
  }
  return savedPosts;
};

const populatePosts = () => {
  const posts = readPosts();
  const promises = posts.map(p => new Post(p).save());
  return Promise.all(promises);
};

module.exports = { readPosts, populatePosts };
