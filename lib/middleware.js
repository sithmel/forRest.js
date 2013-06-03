var getTraverser = require('./traversal_util');

module.exports = function (Traversal, rootobj){
    return function(req, res, next){
        var t = getTraverser(Traversal, req).buildTree;
        t(req.url, rootobj, function (err, context){
            req.context = context;
            if(err){
                req.url = err.url;
            }
            else {
                req.url = '';
            }
            next();
        });

    };
};




