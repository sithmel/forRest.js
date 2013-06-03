
var Traversal = function (req, obj){
    this.req = req;
    this.obj = obj;
};

Traversal.prototype.traverse = function (id, cb){
    var newobj = this.obj[id];

    if(typeof newobj !== 'undefined'){
        cb(null, newobj);
    }
    else {
        cb('not found');
    }
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
    this.obj[id] = obj;
    cb(null, id);
};

Traversal.prototype.update = function (obj, cb){
    this.obj = obj;
    cb(null);
};

Traversal.prototype.destroy = function (cb){
    delete this.obj;
    cb(null);
};

Traversal.prototype.list = function (cb){
    cb(null, Object.keys(this.obj));
};


module.exports = Traversal;







