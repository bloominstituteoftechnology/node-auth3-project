const mongoose = require('mongoose');

const savedPosts = null;

const Post = require('./post.js');
const Data = require('../posts.json');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/so-posts');
const populate = () => {
  const populatePosts = () => {
    const allData = Data;
    const promises = allData.map(p => new Post(p).save());
    return Promise.all(promises);
  };

  return populatePosts()
    .then(() => {
      console.log('done');
      mongoose.disconnect();
    })
    .catch((err) => {
      console.log('ERROR', err);
      throw new Error(err);
    });
};

populate();
