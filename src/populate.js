const fs = require('fs');
const Post = require('./post.js');

let savedPosts = null;

const readPosts = () => {
  // cache posts after reading them once
  if (!savedPosts) {
    const contents = fs.readFileSync('posts.json', 'utf8');
    savedPosts = JSON.parse(contents);
  }
  return savedPosts || [];
};

const populatePosts = async () => {
  const postPromises = await readPosts().map((data) => {
    return new Post(data).save();
  });
  return Promise.all(postPromises);
};

module.exports = { readPosts, populatePosts };
