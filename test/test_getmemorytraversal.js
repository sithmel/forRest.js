// install mocha and should.js to get the test run 
// sudo npm -g install mocha
// sudo npm -g install should
//
// run with "mocha"

var should = require('should'),
    getMemoryTraversal = require('../lib/getmemorytraversal'),
    Traversal = getMemoryTraversal({a:{b:{c:3}}});


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


