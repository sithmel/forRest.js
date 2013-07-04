var getTraverse = require('./gettraverse');

module.exports = function (Traversal, rootobj){
    return function(req, res, next){
        var traversal = new Traversal(req, rootobj);
            traverse = getTraverse(Traversal);

        traverse(traversal, req, req.url, function (err, context){
            req.context = context;
            if (!context){
                return next(new Error('Context not found'));
            }
            if(err){
                req.url = '/' + err.url;
            }
            else {
                req.url = '';
            }
            next();
        });

    };
};




