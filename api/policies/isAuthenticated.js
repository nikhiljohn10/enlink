module.exports = function(req, res, next) {

  if (req.session.me) return next();
  if (req.wantsJSON) {
    return res.send(401);
  }

  return res.redirect('/login');
};
