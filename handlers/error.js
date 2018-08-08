function errorHandle(err, req, res, next) {
    return res.status(err.status || 500).json({
        err: err.message || "opps! Something went wrong",
        code: err.status
    });
}

module.exports = errorHandle;