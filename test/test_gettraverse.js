// install mocha and should.js to get the test run 
// sudo npm -g install mocha
// sudo npm -g install should
//
// run with "mocha"

var should = require('should'),
    MemoryTraversal = require('../lib/memorytraversal'),
    getTraverse = require('../lib/gettraverse'),
    rootobj = {a:{b:{c:3}}};

describe('gettraverse', function(){

    var traverser, traversal;

    before(function(done){
        traversal = new MemoryTraversal(null, rootobj);
        traverse = getTraverse(MemoryTraversal);
        
        done();
    });


    it('buildTree is a function', function(){
        traverse.should.be.an.instanceof(Function);
    });

    it('traversing', function(){
        traverse(traversal, null, '/a', function (err, context){
            var obj;
            obj = context.get();
            obj.should.have.property('b');
        });
    });

    it('traversing 2', function(){
        traverse(traversal, null, '/a/b', function (err, context){
            var obj;
            obj = context.get();
            obj.should.have.property('c');
        });
    });

    it('traversing 3', function(){
        traverse(traversal, null, '/a/b/c', function (err, context){
            var obj;
            obj = context.get();
            obj.should.be.equal(3);
        });
    });

    it('traversing 4', function(){
        traverse(traversal, null, '/a/b/c/d', function (err, context){
            var obj;
            err.url.should.be.equal('d');
            obj = context.get();
            obj.should.be.equal(3);
        });
    });

    it('traversing 5', function(){
        traverse(traversal, null, '/a/b/c/d/e', function (err, context){
            var obj;
            err.url.should.be.equal('d/e');
            obj = context.get();
            obj.should.be.equal(3);
        });
    });

    it('traversal has not parent', function(){
        traverse(traversal, null, '', function (err, context){
            should.not.exist(context.parent); 
        });
    });

    it('traversal has parent', function(){
        traverse(traversal, null, '/a', function (err, context){
            var obj;
            should.exist(context.parent); 
            obj = context.parent.get();
            obj.should.have.property('a');
        });
    });

    it('traversal2 has parent', function(){
        traverse(traversal, null, '/a/b', function (err, context){
            var obj;
            should.exist(context.parent); 
            obj = context.parent.get();
            obj.should.have.property('b');
        });
    });


});


