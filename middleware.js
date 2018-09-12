function errorHandler(err, req, res, next) {
	if (err.errno === 19) {
		return res.json({
			error: true,
			message: "Username is already taken",
		});
	}
	console.error(err);

	res.json({ error: true, message: "Server is borked" });
}

module.exports = errorHandler;
