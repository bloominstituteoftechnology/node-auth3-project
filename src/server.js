/* eslint-disable */
const bodyParser = require('body-parser');
const express = require('express');

const Post = require('./post.js');

const STATUS_USER_ERROR = 422;

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

const idMiddleware = (req, res, next) => {
  const questionId = req.params.soID;
  if (!questionId){
    res.status(STATUS_USER_ERROR);
    res.send(`No post ID was provided`);
    return;
  } else {
    Post.find({soID: questionId})
    .then(response => {
      if (response){
        req.stat = 200;
        req.question = response[0];
        next();
      } else {
        req.stat = 404;
        req.question = "No post found with that ID";
      }
    })
    .catch(err => {
      req.stat = 500;
      req.question = `There was a server error`;
      next();
    })
  }

  // const newSoID = req.params.soID;
  // if (!newSoID){
  //   res.status(STATUS_USER_ERROR);
  //   res.send(`There was an error`);
  //   return;
  // } else {
  //   Post.find({soID: newSoID})
  //   .then(response => {
  //       if (!response[0]){
  //        console.log("There was no post with that ID");
  //        req.stat = 404;
  //        req.foundPost = `There was no post found with that ID`;
  //        next();
  //     } else {
  //       console.log(`The post was found`);
  //       req.stat = 200;
  //       req.foundPost = response[0];
  //       next();  
  //     }      
  //   })
  // }
}

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

server.get('/accepted-answer/:soID', idMiddleware, (req, res) => {
  const newQuestion = req.question;
  const newStatus = req.stat;
  const answerId = newQuestion.acceptedAnswerID;
  
  if (!answerId){
    res.status(404);
    res.send(`No accepted answer found`);
    return;
  }

  Post.find({soID: answerId})
  .then(response => {
    if (!response[0]){
      res.status(404);
      res.send(`No matching answer found`)
    } else {
      res.status(200);
      res.json(response[0])
    }
  })
});

server.get('/top-answer/:soID', idMiddleware, (req, res) => {

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

