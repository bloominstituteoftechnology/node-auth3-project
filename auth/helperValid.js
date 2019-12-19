
function validate(req, res, next) {
    const data = req.body;
    if (!data) {
        res.status(400).json({ error: 'missing username, password' })
    } else if (!data.username) {
        res.status(400).json({ error: 'missing required username' })
    } else if (!data.password) {
        res.status(400).json({ error: 'missing required password' })
    } else {
        next();
    }
}

module.exports = validate