// install mocha and should.js to get the test run 
// sudo npm -g install mocha
// sudo npm -g install should
//
// run with "mocha"

var should = require('should'),
    Traversal = require('../lib/memorytraversal'),
    traverseMiddleware = require('../lib/traversal_middleware'),
    middle = traverseMiddleware(Traversal, {a:{b:{c:3}}});


describe('Traverse middleware', function(){


    it('traverseMiddleware is a function', function(){
        middle.should.be.an.instanceof(Function);
    });

    it('traversing', function(){
        var req = {url:'/a'};
        middle(req, null, function (){
            req.context.get(function (err, obj){
                obj.should.have.property('b');
            });
        });
    });

    it('traversing 2', function(){
        var req = {url:'/a/b'};
        middle(req, null, function (){
            req.context.get(function (err, obj){
                obj.should.have.property('c');
            });
        });
    });

    it('traversing 3', function(){
        var req = {url:'/a/b/c'};
        middle(req, null, function (){
            req.url.should.be.equal('');
            req.context.get(function (err, obj){
                obj.should.be.equal(3);
            });
            
        });
    });

    it('traversing 4', function(){
        var req = {url:'/a/b/c/d'};
        middle(req, null, function (){
            req.url.should.be.equal('d');
            req.context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });

    it('traversing 5', function(){
        var req = {url:'/a/b/c/d/e'};
        middle(req, null, function (){
            req.url.should.be.equal('d/e')
            req.context.get(function (err, obj){
                obj.should.be.equal(3);
            });
        });
    });

});


