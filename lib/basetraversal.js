
var Traversal = function (req, obj){
    this.req = req;
    this.obj = obj;
};

Traversal.prototype.traverse = function (id, cb){
    cb('cannot traverse');
};

Traversal.prototype.get = function (cb){
    if(typeof this.obj === 'undefined'){
        cb('undefined');        
    }
    else {
        cb(null, this.obj);
    }
};

Traversal.prototype.create = function (id, obj, cb){
    cb('cannot create');
};

Traversal.prototype.update = function (obj, cb){
    cb('cannot update');
};

Traversal.prototype.destroy = function (cb){
    cb('cannot delete');
};

Traversal.prototype.list = function (cb){
    cb('cannot list');
};


module.exports = Traversal;







