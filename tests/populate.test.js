const expect = require('chai').expect;

const { expectPost } = require('./helpers.js');
const { populatePosts, readPosts } = require('../src/populate.js');
const Post = require('../src/post.js');

describe('populatePosts()', () => {
  beforeEach(() => Post.remove({}));

  it('populates all posts', () => {
    const id = 572897;
    const posts = readPosts();
    const targetPost = posts.find(p => p.soID === id);

    return populatePosts()
      .then(() => Post.findOne({ soID: id }))
      .then(post => expectPost(572897, post))
      .then(() => Post.count())
      .then(count => expect(count).to.equal(posts.length));
  }).timeout(10 * 1000);
});
