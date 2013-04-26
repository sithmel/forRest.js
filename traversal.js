var BaseTraversal;

BaseTraversal = function (req, obj){
    this.req = req;
    this.obj = obj || this.getRoot();
};

BaseTraversal.prototype.getRoot = function (){
    return; // to be defined
};

BaseTraversal.prototype.traverse = function (id, cb){
    cb('not defined'); // to be defined
};

BaseTraversal.prototype.get = function (cb){
    cb(null, this.obj);
};

BaseTraversal.prototype.create = function (obj, cb){
    cb('not defined');
};

BaseTraversal.prototype.update = function (obj, cb){
    cb('not defined');
};

BaseTraversal.prototype.destroy = function (cb){
    cb('not defined');
};

BaseTraversal.prototype.list = function (cb){
    cb('not defined');
};

exports.BaseTraversal = BaseTraversal;

var getTraverser = function (Traversal, req){
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


//var getTraverser = function (Traversal, req){
//    return function (id, cb){
//        var url_stack = id[0] === '/' && id.slice(1) || id,
//            url, traversal;

//        url_stack = url_stack.split('/').reverse(); // /hello/hode/js [js, hello, node]

//        function traversing(err, obj){
//            var oldtraversal = traversal;
//            traversal = new Traversal(req, obj);
//            traversal.parent = oldtraversal;
//            if (err){
//                cb({type: err, url: url}, traversal);
//            }
//            else {
//                url_stack.reverse();
//                url = url_stack.join('/');
//                url_stack.reverse();

//                if (url.length === 0){
//                    cb(null, traversal);
//                }
//                else {
//                    traversal.traverse(url_stack.pop(), traversing);
//                }
//            }
//            
//        }
//        traversing(null);

//    };
//};

exports.getTraverser = getTraverser;

exports.traverseMiddleware = function (Traversal){
    return function(req, res, next){
        var t = getTraverser(Traversal, req).buildTree;
        t(req.url, function (err, context){
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




