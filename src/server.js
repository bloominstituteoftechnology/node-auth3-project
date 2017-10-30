const bodyParser = require('body-parser');
const express = require('express');

const Post = require('./post.js');

const STATUS_USER_ERROR = 422;

const sendUserError = (error, req, res, next) => {
  res.status(STATUS_USER_ERROR);
  if (typeof error !== 'object' || error instanceof Error) {
    res.send({ error: error.toString() });
  } else {
    res.send(error);
  }
};

const findPostBySOID = (req, res, next) => {
  const soID = req.params.soID;
  if (soID !== null && soID !== undefined) {
    Post.findOne({ soID })
      .then((post) => {
        // eslint-disable-next-line
        if (post == false) {
          const error = new Error(`Couldn't find post with given ID: ${soID}`);
          return next(error);
        }
        req.post = post;
        return next();
      })
      .catch((error) => {
        if (next) {
          next(error);
        } else {
          sendUserError(error);
        }
      });
  } else {
    return next();
  }
};

const server = express();
server.use(bodyParser.json());

const queryAndThen = (query, res, cb) => {
  query.exec((err, result) => {
    if (err) {
      sendUserError(err, null, res);
    } else {
      cb(result);
    }
  });
};

/*
get('http://localhost:3000/accepted-answer/572897')
*/
server.get('/accepted-answer/:soID', findPostBySOID, (req, res, next) => {
  if (!req.post) {
    return next(new Error('Unable to find post.'));
  }
  Post.findOne({ soID: req.post.acceptedAnswerID })
    .then((post) => {
      if (post) {
        res.send(post);
      } else {
        sendUserError(new Error('This post does not have an accepted answer.'));
      }
    })
    .catch(next);
});

server.get('/top-answer/:soID', findPostBySOID, (req, res, next) => {
  if (!req.post) {
    return next(new Error('Unable to find post.'));
  }
  const query = Post
    .findOne({
      soID: { $ne: req.post.acceptedAnswerID },
      parentID: req.post.soID,
    })
    .sort({ score: 'desc' });

  queryAndThen(query, res, (answer) => {
    if (!answer) {
      return next(new Error('No top answer'));
    }
    res.json(answer);
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

server.use(sendUserError);

module.exports = { server };
