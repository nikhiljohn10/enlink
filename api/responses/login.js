var salt = process.env.SALT;
var bcrypt = require('bcrypt');
var CPSDB = require('../services/CPSDB');
var cps = CPSDB.init();
cps.connect('enlink_users', 'document', 'document/id');
module.exports = function login(inputs) {
    inputs = inputs || {};
    var req = this.req;
    var res = this.res;
    bcrypt.hash(input.password, salt, function(err, hash) {
        cps.search([{
            email: input.email,
            password: hash
        }], function(err, user) {
            if (err) return res.negotiate(err);
            if (!user) {

                if (req.wantsJSON || !inputs.invalidRedirect) {
                    return res.badRequest('Invalid username/password combination.');
                }
                return res.redirect(inputs.invalidRedirect);
            }
            req.session.me = user.id;
            req.session.admin = user.isAdmin
            if (req.wantsJSON || !inputs.successRedirect) {
                return res.ok();
            }

            return res.redirect(inputs.successRedirect);
        })
    });
};
