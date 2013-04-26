// install mocha and should.js to get the test run 
// sudo npm -g install mocha
// sudo npm -g install should
//
// run with "mocha"

var should = require('should'),
    traversal = require('./traversal'),
    Traversal;

// mock traversal
//traversal.BaseTraversal util.inherit


Traversal = function (req, obj){
    this.req = req;
    this.obj = obj || this.getRoot();
};

Traversal.prototype.getRoot = function (){
    return {a:{b:{c:3}}};
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
    var err;
    cb(err, id);
};

Traversal.prototype.update = function (obj, cb){
    var err;
    cb(err);
};

Traversal.prototype.destroy = function (obj, cb){
    var err;
    cb(err);
};

Traversal.prototype.list = function (cb){
    var err;
    cb(err, resp);
};


// testing the mock traversal

describe('Simple obj Traversal', function(){

    it('it is defined', function(){
      var t = new Traversal();
      should.exist(t);
    });

    it('it traverse', function(){
      var t = new Traversal();
      t.traverse('a', function (err, obj){
          should.exist(obj);
      });

      t.traverse('x', function (err, obj){
          err.should.be.ok;
//          should.strictEqual(undefined,obj);
      });
      
    });

    it('it traverse 2', function(){
      var t = new Traversal();
      
      t.traverse('a', function (err, obj){
          var t2 = new Traversal({}, obj);
          t2.traverse('b', function (err, obj2){
              should.exist(obj2);
          });
      });
      
    });

});

describe('buildTree', function(){

    it('it is defined', function(){
      should.exist(traversal);
    });

    it('buildTree is a function', function(){
        var middle = traversal.getTraverser(Traversal).buildTree
        middle.should.be.an.instanceof(Function);
    });

    it('traversing', function(){
        var getTraverser = traversal.getTraverser(Traversal).buildTree
        getTraverser('/a', function (err, context){
            context.get(function (err, obj){
                obj.should.have.property('b');
            });
        });
    });

    it('traversing 2', function(){
        var getTraverser = traversal.getTraverser(Traversal).buildTree
        getTraverser('/a/b', function (err, context){
            context.get(function (err, obj){
                obj.should.have.property('c');
            });
        });
    });

    it('traversing 3', function(){
        var getTraverser = traversal.getTraverser(Traversal).buildTree
        getTraverser('/a/b/c', function (err, context){
            context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });

    it('traversing 4', function(){
        var getTraverser = traversal.getTraverser(Traversal).buildTree
        getTraverser('/a/b/c/d', function (err, context){
            err.url.should.be.equal('d');
            context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });

    it('traversing 5', function(){
        var getTraverser = traversal.getTraverser(Traversal).buildTree
        getTraverser('/a/b/c/d/e', function (err, context){
            err.url.should.be.equal('d/e');
            context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });


    it('traversal has not parent', function(){
        var getTraverser = traversal.getTraverser(Traversal).buildTree
        getTraverser('', function (err, context){
            should.not.exist(context.parent); 
        });
    });

    it('traversal has parent', function(){
        var getTraverser = traversal.getTraverser(Traversal).buildTree
        getTraverser('/a', function (err, context){
            should.exist(context.parent); 
            context.parent.get(function (err, obj){
                obj.should.have.property('a');
            });
        });
    });

    it('traversal2 has parent', function(){
        var getTraverser = traversal.getTraverser(Traversal).buildTree
        getTraverser('/a/b', function (err, context){
            should.exist(context.parent); 
            context.parent.get(function (err, obj){
                obj.should.have.property('b');
            });
        });
    });

});




describe('Traverse middleware', function(){

    it('it is defined', function(){
      should.exist(traversal);
    });

    it('traverseMiddleware is a function', function(){
        var middle = traversal.traverseMiddleware(Traversal);
        middle.should.be.an.instanceof(Function);
    });

    it('traversing', function(){
        var middle = traversal.traverseMiddleware(Traversal),
            req = {url:'/a'};
        middle(req, null, function (){
            req.context.get(function (err, obj){
                obj.should.have.property('b');
            });
        });
    });

    it('traversing 2', function(){
        var middle = traversal.traverseMiddleware(Traversal),
            req = {url:'/a/b'};
        middle(req, null, function (){
            req.context.get(function (err, obj){
                obj.should.have.property('c');
            });
        });
    });

    it('traversing 3', function(){
        var middle = traversal.traverseMiddleware(Traversal),
            req = {url:'/a/b/c'};
        middle(req, null, function (){
            req.url.should.be.equal('');
            req.context.get(function (err, obj){
                obj.should.be.equal(3);
            });
            
        });
    });

    it('traversing 4', function(){
        var middle = traversal.traverseMiddleware(Traversal),
            req = {url:'/a/b/c/d'};
        middle(req, null, function (){
            req.url.should.be.equal('d');
            req.context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });

    it('traversing 5', function(){
        var middle = traversal.traverseMiddleware(Traversal),
            req = {url:'/a/b/c/d/e'};
        middle(req, null, function (){
            req.url.should.be.equal('d/e')
            req.context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });

});


