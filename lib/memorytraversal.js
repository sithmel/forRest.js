
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

Traversal.prototype.get = function (){
    return this.obj;
};

Traversal.prototype.create = function (id, obj, cb){
    this.obj[id] = obj;
    cb(null, id);
};

Traversal.prototype.update = function (obj, cb){
    this.obj = obj;
    cb(null);
};

Traversal.prototype.destroy = function (id, cb){
    if (id in this.obj){
        delete this.obj[id];
        cb(null);
    }
    else {
        cb('not found');
    }
};

Traversal.prototype.query = function (opt, cb){
    cb('cannot list');
//    cb(null, Object.keys(this.obj));
};


module.exports = Traversal;

