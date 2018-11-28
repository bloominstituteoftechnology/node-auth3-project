module.exports = (department) => {
    return (req, res, next) => {
        if(req.decodedToken && (req.decodedToken.department === department)) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    }
}