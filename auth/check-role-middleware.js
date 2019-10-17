module.exports = role => {
    return (req, res, next) => {
        if (role === req.user.role) {
            next();
        } else {
            res.status(403).json({ you: 'Can\'t touch this' });
        };
    };
};