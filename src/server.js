const bodyParser = require('body-parser');
const express = require('express');

const Post = require('./post.js');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

const sendUserError = (err, res) => {
  res.status(STATUS_USER_ERROR);
  if (typeof err === 'string') {
    res.json({ error: err });
  } else {
    res.json(err);
  }
};

const queryAndThen = (query, res, cb) => {
  query.exec((err, result) => {
    if (err) {
      sendUserError(err, res);
    } else {
      cb(result);
    }
  });
};

const findPost = (req, res, next) => {
  const soID = req.params.soID;
  if (!soID) {
    res
      .status(500)
      .send({ errorMessage: 'You must supply an ID for the post.' });
    return;
  }
  req.post = Post.findOne({ soID });
  next();
};

server.get('/accepted-answer/:soID', findPost, (req, res) => {
  queryAndThen(req.post, res, (post) => {
    if (!post) {
      sendUserError("Couldn't find post with given ID", res);
      return;
    }

    const query = Post.findOne({ soID: post.acceptedAnswerID });
    queryAndThen(query, res, (answer) => {
      if (!answer) {
        sendUserError('No accepted answer', res);
      } else {
        res.json(answer);
      }
    });
  });
});

server.get('/top-answer/:soID', findPost, (req, res) => {
  queryAndThen(req.post, res, (post) => {
    if (!post) {
      sendUserError("Couldn't find post with given ID", res);
      return;
    }

    const query = Post
      .findOne({
        soID: { $ne: post.acceptedAnswerID },
        parentID: post.soID,
      })
      .sort({ score: 'desc' });

    queryAndThen(query, res, (answer) => {
      if (!answer) {
        sendUserError('No top answer', res);
      } else {
        res.json(answer);
      }
    });
  });
});

server.get('/popular-jquery-questions', (req, res) => {
  const query = Post.find({
    parentID: null,
    tags: 'jquery',
    $or: [
      { score: { $gt: 5000 } },
      { 'user.reputation': { $gt: 200000 } }
    ]
  });

  queryAndThen(query, res, posts => res.json(posts));
});

server.get('/npm-answers', (req, res) => {
  const query = Post.find({
    parentID: null,
    tags: 'npm'
  });

  queryAndThen(query, res, (posts) => {
    const answerQuery = Post.find({
      parentID: { $in: posts.map(p => p.soID) }
    });
    queryAndThen(answerQuery, res, answers => res.json(answers));
  });
});

module.exports = { server };
