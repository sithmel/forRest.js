
var getMemoryTraversal = function (rootobj){

    var Traversal = function (req, obj){
        this.req = req;
        this.obj = obj || rootobj;
    };

    Traversal.prototype.traverse = function (id, cb){
        var newobj = this.obj[id];

        if(typeof newobj !== 'undefined'){
            cb(null, newobj);
        }
        else {
            cb('not found', this.obj);
        }
    };

    Traversal.prototype.get = function (cb){
        cb(null, this.obj);
    };

    Traversal.prototype.create = function (id, obj, cb){
        this.obj[id] = obj;
        cb(null, id);
    };

    Traversal.prototype.update = function (obj, cb){
        this.obj = obj;
        cb(null);
    };

    Traversal.prototype.destroy = function (obj, cb){
        delete this.obj;
        cb(null);
    };

    Traversal.prototype.list = function (cb){
        cb(null, Object.keys(this.obj));
    };

    return Traversal
};

module.exports = getMemoryTraversal;







