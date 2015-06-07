/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var cps = CPSDB.init();
var uuid = require('node-uuid');
cps.connect('enlink_posts', 'document', 'document/id');
module.exports = {


    fav: function(req, res) {
        var id = req.param('postid');
        return res.redirect('/enlink');
    },

    add: function(req, res) {
        var user = req.param('username');
        var timestamp = new Date().toISOString();
        var content = req.param('content');
        var pub = false;
        var tag = req.param('tag');
        if (req.param('public') == 'public') pub = true;
        req.file('pdflink').upload({
            maxBytes: 10000000
        }, function whenDone(err, files) {
            console.log(JSON.stringify(files));
            var ext, fileID, pid = 0;
            if (err) {
                return res.redirect('/enlink');
            }

            if (files.length === 0) {
                return res.redirect('/enlink');
            }

            if (files[0].type === 'application/octet-stream') {
                ext = '';
                fileID = (files[0].fd).replace(/^.*[\\\/]/, '');
            } else {
                ext = (files[0].fd).replace(/^.*[^\\\/]\./, '');
                fileID = ((files[0].fd).replace(/^.*[\\\/]/, '')).replace(/\..*$/, '');
            }
            cps.insert({
                id:uuid.v1(),
                username: user,
                timestamp: timestamp,
                content: content,
                public: pub,
                tag: tag,
                file: fileID
            },function(err, result){
                return res.redirect('/enlink');
            });
        });
    },


    addLike: function(req, res) {
        var id = req.param('postid');
        cps.search({id:id},function(err, post){
            cps.update({id:id,likes:((post.document[0].like)+1)}, function(err, result){
                res.send(result);
            })
        });
    },


    comment: function(req, res) {   
        var id = req.param('postid');
        var comment = req.param('comment');
        return res.json({
            todo: 'comment() is not implemented yet!'
        });
    },


    enlink: function(req, res) {
        return res.view('enlink');
    },


    upload: function(req, res) {
        return res.view('upload');
    },

    rate: function(req, res) {
        var id = req.param('postid');
        var rate = req.param('rate');
        return res.json({
            todo: 'rate() is not implemented yet!'
        });
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
        }, function(err, post) {
            if (err) return res.negotiate(err);
            console.log(post.document);
            return res.redirect('/enlink');
        });
    },

    search: function(req, res){
        var kword = req.param('keyword');
        cps.search([{content:kword}],function(err, result){
            if(!err) return res.view('search',{
                result: result.results.document
            });
            else return res.redirect('/enlink');
        });
    }

};
