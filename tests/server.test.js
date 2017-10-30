const chai = require('chai');
const chaiHTTP = require('chai-http');

const { expectPost, expectPosts } = require('./helpers.js');
const { populatePosts } = require('../src/populate.js');
const Post = require('../src/post.js');
const server = require('../src/server.js');

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

// allows us to make and test HTTP requests
chai.use(chaiHTTP);

const expect = chai.expect;

/* Expects the status code expected from the given response, res. Throws
 * a useful error message if the expectation is not met. Assumes the request
 * method is GET and uses path for error messages. */
const expectStatus = (expected, res, path) => {
  // We assume the status *isn't* expected to be STATUS_SERVER_ERROR or
  // STATUS_NOT_FOUND; in these cases, we have custom error messages that
  // help the student out (see switch statement below).
  if (expected === STATUS_SERVER_ERROR || expected === STATUS_NOT_FOUND) {
    throw new Error(
      'The expected status should be something other than ' +
      `${STATUS_SERVER_ERROR} and ${STATUS_NOT_FOUND}`
    );
  }

  switch (res.status) {
    case STATUS_SERVER_ERROR:
      throw new Error(
        `Your server threw an error during GET ${path} (status code 500); ` +
        'scroll up to see the expection and backtrace'
      );

    case STATUS_NOT_FOUND:
      throw new Error(
        `You haven't implemented a handler for GET ${path} (status code 404)`
      );

    default:
      if (expected !== res.status) {
        const msg = `Expected status ${expected} but got ${res.status} from ` +
          `GET ${path}; scroll up to see response body`;
        /* eslint no-console: 0 */
        console.log(`Response body for GET ${path}:\n`, res.body);
        throw new Error(msg);
      }

      /* eslint no-unused-expressions: 0 */
      // This is the correct way to make the expectation, even though it seems odd.
      expect(res).to.be.json;
  }
};

/* Makes a GET request using to the provided path. If body is given, sends it
 * along with the request. Checks for the expected status. */
const get = (path, status) => {
  return chai.request(server.server).get(path)
    .catch((err) => {
      // For status codes like 404, 500, and 422, the promise fails and contains
      // a response property in the error object. We want to rescue these cases
      // and return the response object normally. That way we can have a single
      // handler that checks status properly in all cases.
      if (err.response) {
        return err.response;
      }
      throw err;
    })
    .then((res) => {
      expectStatus(status, res, path);
      return res.body;
    });
};

describe('Request', () => {
  /* eslint func-names: 0 */
  before(function () {
    this.timeout(50000);
    return Post.remove({}).then(populatePosts);
  });

  describe('GET /accepted-answer/:soID', () => {
    it('returns the accepted answer', () => {
      return get('/accepted-answer/2067472', STATUS_OK)
        .then(post => expectPost(2067584, post));
    });

    it('reports a bad id', () => {
      return get('/accepted-answer/bad', STATUS_USER_ERROR);
    });

    it('reports a post with no accepted answer', () => {
      return get('/accepted-answer/21459196', STATUS_USER_ERROR);
    });
  });

  describe('GET /top-answer/:soID', () => {
    it('returns the top answer', () => {
      return get('/top-answer/208105', STATUS_OK)
        .then(post => expectPost(21735614, post));
    });

    it('reports a bad id', () => {
      return get('/top-answer/bad', STATUS_USER_ERROR);
    });

    it('reports a post with no top answer', () => {
      return get('/top-answer/31392914', STATUS_USER_ERROR);
    });
  });

  describe('GET /popular-jquery-questions', () => {
    it('returns popular jquery questions', () => {
      return get('/popular-jquery-questions', STATUS_OK)
        .then(posts => expectPosts([503093, 178325, 14994391], posts));
    });
  });

  describe('GET /npm-answers', () => {
    it('returns answers to npm questions', () => {
      const expectedPostIDs = [
        25861938,
        39607180,
        33067594,
        27490301,
        22345808,
        33213161,
        22365742,
        24456372,
        31733623,
        41777052,
        39789894,
        18652918,
        28550313,
        27105655,
        31633281,
        26319078,
        31219726,
        26171511,
        24844920,
      ];
      return get('/npm-answers', STATUS_OK)
        .then(posts => expectPosts(expectedPostIDs, posts));
    });
  });
});
