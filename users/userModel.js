const data = require("../data/config")

function find() {
	return data("accounts").select("id", "name", "department")
}

module.exports = {
	find
}