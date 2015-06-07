/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var cps = CPSDB.init();
cps.connect('enlink_posts', 'document', 'document/id');
module.exports = {



    /**
     * `PostController.fav()`    /post/fav
     */
    fav: function(req, res) {
        var id = req.param('postid');
        return res.json({
            todo: 'fav() is not implemented yet!'
        });
    },

    /**
     * `PostController.add()`
     */
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
            var ext, fileID, pid = 0;
            if (err) {
                return res.negotiate(err);
            }

            if (files.length === 0) {
                return res.badRequest('No file was uploaded');
            }

            if (files[0].type === 'application/octet-stream') {
                ext = '';
                fileID = (files[0].fd).replace(/^.*[\\\/]/, '');
            } else {
                ext = (files[0].fd).replace(/^.*[^\\\/]\./, '');
                fileID = ((files[0].fd).replace(/^.*[\\\/]/, '')).replace(/\..*$/, '');
            }
            res.send(200, fileID);
            // insert here
            return fileID;
        });
    },


    /**
     * `PostController.rate()`
     */
    rate: function(req, res) {
        var id = req.param('postid');
        var rate = req.param('rate');
        return res.json({
            todo: 'rate() is not implemented yet!'
        });
    },


    /**
     * `PostController.addLike()`   /post/addLike
     */
    addLike: function(req, res) {
        var id = req.param('postid');
        return res.json({
            todo: 'addLike() is not implemented yet!'
        });
    },


    /**
     * `PostController.comment()`  
     */
    comment: function(req, res) {   
        var id = req.param('postid');
        var comment = req.param('comment');
        return res.json({
            todo: 'comment() is not implemented yet!'
        });
    }
};
