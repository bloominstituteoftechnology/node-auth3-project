// only proceed to next middleware if user is logged in and is from the correct department
module.exports = (department) => {
    return (req, res, next) => {
        if(req.decodedToken && (req.decodedToken.department === department)) {
            next();
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    }
}