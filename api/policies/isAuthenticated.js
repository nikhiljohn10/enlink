module.exports = function(req, res, next) {
    if (req.session.me) {
        next();
    } else {
        res.redirect('/signin');
    }
};
