
module.exports = function (Traversal){
    return function (traversal, req, path, cb){
        var newpath = (path[0] === '/' && path.slice(1) || path),
            pathlist = newpath.split('/');
            // from /hello/hode/js to [hello, node, js]

        function traversing(err, obj){
            var oldtraversal = traversal;
            if (err){
                cb({type: err, url: newpath}, oldtraversal);
            }
            else {
                traversal = new Traversal(req, obj);
                traversal.parent = oldtraversal;
                newpath = pathlist.join('/')
                if (newpath.length === 0){
                    cb(null, traversal);
                }
                else {
                    traversal.traverse(pathlist.shift(), traversing);
                }
            }
        }

        traversal.traverse(pathlist.shift(), traversing);
    
    };
};
