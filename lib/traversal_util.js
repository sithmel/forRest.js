
module.exports = function (Traversal, req){
    return {
        buildTree: function (path, cb){
            var pathlist, traversal, newpath;

            // from /hello/hode/js to [hello, node, js]
            pathlist = (path[0] === '/' && path.slice(1) || path).split('/'); 

            function traversing(err, obj){
                var oldtraversal = traversal;
                traversal = new Traversal(req, obj);
                traversal.parent = oldtraversal;
                if (err){
                    cb({type: err, url: newpath}, traversal);
                }
                else {
                    newpath = pathlist.join('/')
                    if (newpath.length === 0){
                        cb(null, traversal);
                    }
                    else {
                        traversal.traverse(pathlist.shift(), traversing);
                    }
                }
            }
            traversing(null);

        },
        traverse: function (oldtraversal, id, cb){
            var obj = oldtraversal.traverse(id, function (err, obj){
                var traversal;
                if (err){
                    cb(err, null);
                }
                else {
                    traversal = new Traversal(req, obj);
                    traversal.parent = oldtraversal;
                    cb(null, traversal);
                }
            });
        }
    };
};


