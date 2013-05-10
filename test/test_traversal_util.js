// install mocha and should.js to get the test run 
// sudo npm -g install mocha
// sudo npm -g install should
//
// run with "mocha"

var should = require('should'),
    getMemoryTraversal = require('../lib/getmemorytraversal'),
    traversal_util = require('../lib/traversal_util'),
    Traversal = getMemoryTraversal({a:{b:{c:3}}}),
    traversal = traversal_util(Traversal, null);


describe('buildTree', function(){

    it('it is defined', function(){
      should.exist(traversal);
    });

    it('buildTree is a function', function(){
        var middle = traversal.buildTree
        middle.should.be.an.instanceof(Function);
    });

    it('traversing', function(){
        var getTraverser = traversal.buildTree
        getTraverser('/a', function (err, context){
            context.get(function (err, obj){
                obj.should.have.property('b');
            });
        });
    });

    it('traversing 2', function(){
        var getTraverser = traversal.buildTree
        getTraverser('/a/b', function (err, context){
            context.get(function (err, obj){
                obj.should.have.property('c');
            });
        });
    });

    it('traversing 3', function(){
        var getTraverser = traversal.buildTree
        getTraverser('/a/b/c', function (err, context){
            context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });

    it('traversing 4', function(){
        var getTraverser = traversal.buildTree
        getTraverser('/a/b/c/d', function (err, context){
            err.url.should.be.equal('d');
            context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });

    it('traversing 5', function(){
        var getTraverser = traversal.buildTree
        getTraverser('/a/b/c/d/e', function (err, context){
            err.url.should.be.equal('d/e');
            context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });


    it('traversal has not parent', function(){
        var getTraverser = traversal.buildTree
        getTraverser('', function (err, context){
            should.not.exist(context.parent); 
        });
    });

    it('traversal has parent', function(){
        var getTraverser = traversal.buildTree
        getTraverser('/a', function (err, context){
            should.exist(context.parent); 
            context.parent.get(function (err, obj){
                obj.should.have.property('a');
            });
        });
    });

    it('traversal2 has parent', function(){
        var getTraverser = traversal.buildTree
        getTraverser('/a/b', function (err, context){
            should.exist(context.parent); 
            context.parent.get(function (err, obj){
                obj.should.have.property('b');
            });
        });
    });

    // test traverse method

});





