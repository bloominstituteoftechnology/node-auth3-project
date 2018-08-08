// error handling middleware
function errors(err, req, res, next) {
  console.log('OUTSIDE ERRORS');
  console.log('ERROR', err);
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
      console.log('IN ERRORS');
      res.status(400).send({
        error: 'Something weird has happened!',
      });
      return;
  }
}

module.exports = errors;
