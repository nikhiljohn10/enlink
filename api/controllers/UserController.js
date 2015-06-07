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

        bcrypt.hash(password, salt, function(err, hash) {
            cps.insert({
                id: uuid.v1(),
                username: username,
                email: email,
                password: hash
            }, function(err, user) {
                if (err) return res.negotiate(err);
                console.log(user);
                req.session.me = user.id;
                req.session.admin = user.isAdmin
                return res.redirect('/');
            });
        });

    },

    signin: function(req, res) {
        return res.login({
            email: req.param('email'),
            password: req.param('password'),
            successRedirect: '/',
            invalidRedirect: '/login'
        });
    },

    logout: function(req, res) {
        return res.json({
            todo: 'logout() is not implemented yet!'
        });
    },

    profile: function(req, res) {
        var name = req.param('name');
        var about = req.param('about');
        var locaition = req.param('locaition');
        var category = req.param('category');
        return res.json({
            todo: 'logout() is not implemented yet!'
        });
    }
};
