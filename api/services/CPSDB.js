var cps = require('cps-api');
var config = {
    url: 'tcp://cloud-eu-0.clusterpoint.com:9007',
    username: 'nidhiya@webaccede.com',
    password: 'Neethu',
    aid: 936 // Account ID
};
exports.init = function() {
    var doc = {
        document: "no",
        balance: "yes"
    };
    var connection;
    return {
        connect: function(db, doc, docID) {
            connection = new cps.Connection(
                config.url,
                db,
                config.username,
                config.password,
                doc,
                docID, {
                    account: config.aid
                }
            );
        },
        insert: function(data, cb) {
            connection.sendRequest(new cps.InsertRequest(data), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            });
        },
        update: function(data, cb) {
            connection.sendRequest(new cps.UpdateRequest(data), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            });
        },
        replace: function(data, cb) {
            connection.sendRequest(new cps.ReplaceRequest(data), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            });
        },
        partialReplace: function(data, cb) {
            connection.sendRequest(new cps.PartialReplaceRequest(data), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            },'json');
        },
        delete: function(data, cb) {
            connection.sendRequest(new cps.DeleteRequest(data), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            });
        },
        search: function(data, cb) {
            var query = "{";
            data.forEach(function(obj) {
                (Object.keys(obj)).forEach(function(condition) {
                    query += cps.Term(obj[condition], condition);
                });
            });
            query += "}";
            var search_req = new cps.SearchRequest(query);
            // Search Ordering not applied here #TODO
            // search_req.setOrdering(cps.NumericOrdering("id", "asc"));
            connection.sendRequest(search_req, function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            });
        },
        lookup: function(data, cb) {
            connection.sendRequest(new cps.LookupRequest(data, doc), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            },'json');
        },
        retrieve: function(data, cb) {
            connection.sendRequest(new cps.RetrieveRequest(data), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            },'json');
        },
        listLast: function(start, end, cb) {
            connection.sendRequest(new cps.ListLastRequest(doc, (start || 0), (end || 10)), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            },'json');
        },
        listPaths: function(cb) {
            connection.sendRequest(new cps.ListPathsRequest(), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            },'json');
        },
        status: function(cb) {
            connection.sendRequest(new cps.StatusRequest(), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            },'json');
        },
        clear: function(cb) {
            connection.sendRequest(new cps.Request('clear'), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            },'json');
        },
        reindex: function(cb) {
            connection.sendRequest(new cps.Request('reindex'), function(err, resp) {
                if (err) return cb(err);
                return cb(null, resp);
            },'json');
        }
    };
};
