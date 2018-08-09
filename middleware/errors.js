// error handling middleware
function errors(err, req, res, next) {
  switch (err.code) {
    case 400:
      res.status(400).json({
        error: err.error,
      });
      return;

    case 500:
      res.status(500).json({
        error: err.error,
      });
      return;

    default:
      console.log('IN ERRORS', err);
      res.status(400).send({
        error: `${err}`,
      });
      return;
  }
}

module.exports = errors;
