module.exports = function isAuth(req, res, next) {
    if (req.session.me) {
        if (req.session.admin) {
            next();
        } else {
            res.redirect('/enlink');
        }
    } else {
        res.redirect('/');
    }
};
