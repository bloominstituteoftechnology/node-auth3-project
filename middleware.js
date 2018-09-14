function errorHandler(err, req, res, next) {
	console.log(err.errno);
	if (err.errno === 19) {
		return res.json({
			error: true,
			message: "Username is already taken",
		});
	}

	res.json({ error: true, message: "Server is borked" });
}

module.exports = errorHandler;
