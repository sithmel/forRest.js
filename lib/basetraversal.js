
var Traversal = function (req, obj){
    this.req = req;
    this.obj = obj;
};

Traversal.prototype.traverse = function (id, cb){
    cb('cannot traverse');
};

Traversal.prototype.get = function (){
    return this.obj;
};

Traversal.prototype.create = function (id, obj, cb){
    cb('cannot create');
};

Traversal.prototype.update = function (obj, cb){
    cb('cannot update');
};

Traversal.prototype.destroy = function (id, cb){
    cb('cannot delete');
};

Traversal.prototype.query = function (opt, cb){
    cb('cannot list');
};


module.exports = Traversal;

//var Controllers = occamsrazor()
//    .addNew([occamsrazor.isAnything, occamsrazor.isAnything], Controller)


//var Controller = function (id, obj, parent){
//    this.obj = obj;
//    this.id = id;
//    this.parent = parent
//};

//Controller.prototype.traverse = function (id, cb){
//    getObject.... function (){
//        cb(Controllers(id, newobj, parent))
//    }
//    cb(null, obj);
//    cb('cannot traverse');
//};


// this is the final controller (no more routing)

//Controller.prototype.action = function (req, res){
//    this.obj, this.parent, this.id are available 
// 
//};

// A front end API?



