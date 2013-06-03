// install mocha and should.js to get the test run 
// sudo npm -g install mocha
// sudo npm -g install should
//
// run with "mocha"

var should = require('should'),
    MemoryTraversal = require('../lib/memorytraversal'),
    traversal_util = require('../lib/traversal_util');

describe('buildTree', function(){

    var getTraverser;

    before(function(done){
      var Traversal = MemoryTraversal,
          traversal = traversal_util(Traversal, null);
    
      getTraverser = traversal.buildTree;
    
      done();
    });


    it('buildTree is a function', function(){
        getTraverser.should.be.an.instanceof(Function);
    });

    it('traversing', function(){
        getTraverser('/a', {a:{b:{c:3}}}, function (err, context){
            context.get(function (err, obj){
                obj.should.have.property('b');
            });
        });
    });

    it('traversing 2', function(){
        getTraverser('/a/b', {a:{b:{c:3}}}, function (err, context){
            context.get(function (err, obj){
                obj.should.have.property('c');
            });
        });
    });

    it('traversing 3', function(){
        getTraverser('/a/b/c', {a:{b:{c:3}}}, function (err, context){
            context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });

    it('traversing 4', function(){
        getTraverser('/a/b/c/d', {a:{b:{c:3}}}, function (err, context){
            err.url.should.be.equal('d');
            context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });

    it('traversing 5', function(){
        getTraverser('/a/b/c/d/e', {a:{b:{c:3}}},function (err, context){
            err.url.should.be.equal('d/e');
            context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });


    it('traversal has not parent', function(){
        getTraverser('', {a:{b:{c:3}}}, function (err, context){
            should.not.exist(context.parent); 
        });
    });

    it('traversal has parent', function(){
        getTraverser('/a', {a:{b:{c:3}}}, function (err, context){
            should.exist(context.parent); 
            context.parent.get(function (err, obj){
                obj.should.have.property('a');
            });
        });
    });

    it('traversal2 has parent', function(){
        getTraverser('/a/b', {a:{b:{c:3}}}, function (err, context){
            should.exist(context.parent); 
            context.parent.get(function (err, obj){
                obj.should.have.property('b');
            });
        });
    });


});


// test traverse method


describe('traverse', function(){

    var getTraverser, t, traverse, Traversal;

    before(function(done){
      var traversal;

      Traversal = MemoryTraversal;
      traversal = traversal_util(Traversal, null);

      traverse = traversal.traverse;

      traversal.buildTree('/a', {a:{b:{c:3}}}, function (err, context){
        t = context;
        done();
      });

    });

    it('traversing', function(){
        traverse(t, "b", function (err, t1){
            t1.should.be.an.instanceof(Traversal);
            should.exist(t1.parent); 
            t1.parent.should.be.an.instanceof(Traversal);
        });
    });

});

