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
                console.log(user.document);
                req.session.me = user.document[0].id;
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
        var name = req.param('name');
        var about = req.param('about');
        var location = req.param('location');
        var url = req.param('url');
        var category = req.param('category');
        cps.update({
            id: req.session.me+"",
            name: name,
            about: about,
            location: location,
            linkedinUrl: url,
            category: category
        }, function(err, user) {
            if (err) return res.negotiate(err);
            console.log(user.document);
            return res.redirect('/enlink');
        });
    }
};
