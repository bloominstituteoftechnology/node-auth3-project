const expect = require('chai').expect;

const { readPosts } = require('../src/populate.js');

let savedPostsByID = null;

const readPost = (id) => {
  if (!savedPostsByID) {
    const posts = readPosts();
    savedPostsByID = {};
    posts.forEach(p => savedPostsByID[p.soID] = p);
  }
  return savedPostsByID[id];
};

const expectPost = (id, post) => {
  const expected = readPost(id);
  if (!expected) {
    throw new Error(`invalid expected post id: ${id}`);
  }

  const mungedPost = Object.keys(expected).reduce((memo, key) => {
    switch (key) {
      case 'user':
        memo[key] = Object.assign({}, post[key]);
        delete memo[key].$init;
        break;
      default:
        memo[key] = post[key];
        break;
    }

    return memo;
  }, {});

  expect(mungedPost).to.deep.equal(expected);
};

const expectPosts = (ids, posts) => {
  const idsSet = new Set(ids);
  posts.forEach((post) => {
    if (!idsSet.has(post.soID)) {
      throw new Error(
        `Post with soID ${post.soID} should *not* be included in the ` +
        'response. To see the full post object, look in posts.json for that ' +
        'soID.'
      );
    }

    expectPost(post.soID, post);
    idsSet.delete(post.soID);
  });

  if (idsSet.size > 0) {
    throw new Error(
      `Post(s) with soID(s) ${Array.from(idsSet).join(', ')} are missing ` +
      'from the response. To see the full post objects, look in posts.json ' +
      'for those soIDs.'
    );
  }
};

module.exports = { expectPost, expectPosts };
