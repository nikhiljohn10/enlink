/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var salt = process.env.SALT;
var uuid = require('node-uuid');
var bcrypt = require('bcrypt');
var cps = CPSDB.init();
cps.connect('enlink_users', 'document', 'document/id');
module.exports = {

    signup: function(req, res) {
        var username = req.param('username');
        var email = req.param('email');
        var password = req.param('password');
        req.session.admin = false
        bcrypt.hash(password, salt, function(err, hash) {
            cps.insert({
                id: uuid.v1(),
                username: username,
                email: email,
                password: hash,
                isAdmin: false
            }, function(err, user) {
                if (err) return res.negotiate(err);
                console.log(user.document);
                req.session.me = user.document[0].id;
                req.session.admin = user.document[0].isAdmin;
                return res.redirect('/profile');
            });
        });

    },

    signin: function(req, res) {
        return res.login({
            username: req.param('username'),
            password: req.param('password'),
            successRedirect: '/enlink',
            invalidRedirect: '/login'
        });
    },
    logout: function(req, res) {
        req.session.me = null;
        req.session.admin = false;
        return res.redirect('/');
    },

    profile: function(req, res) {
        return res.view('user/profile');
    },
    search: function(req, res){
        return res.view('search');
    }
};
