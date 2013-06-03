// install mocha and should.js to get the test run 
// sudo npm -g install mocha
// sudo npm -g install should
//
// run with "mocha"

var should = require('should'),
    MemoryTraversal = require('../lib/memorytraversal');



describe('Simple obj Traversing', function(){
    var t, rootobj;

    before(function(done){
      rootobj = {a:{b:{c:3}}}
      t = new MemoryTraversal(null, rootobj);
      done();
    });


    it('it is defined', function(){
      should.exist(t);
    });

    it('it traverse', function(){
      t.traverse('a', function (err, obj){
          should.exist(obj);
      });

      t.traverse('x', function (err, obj){
          err.should.be.ok;
      });
      
    });

    it('it traverse 2', function(){
      
      t.traverse('a', function (err, obj){
          var t2 = new MemoryTraversal({}, obj);
          t2.traverse('b', function (err, obj2){
              should.exist(obj2);
          });
      });
      
    });

});

describe('Getting the original object', function(){

    var t, rootobj;

    before(function(done){
      rootobj = {a:{b:{c:3}}}
      t = new MemoryTraversal(null, rootobj);
      done();
    });

    it('Before traversing', function(){
      t.get(function (err, obj){
          obj.should.be.equal(rootobj);
      });
    });

    it('After traversing', function(){
      
      t.traverse('a', function (err, obj){
          var t2 = new MemoryTraversal({}, obj);
          
          
          t2.get(function (err, obj){
          obj.should.be.equal(rootobj.a);
          });
      });
    });


});


describe('Append an object', function(){

    var t, rootobj;

    before(function(done){
      rootobj = {a:{b:{c:3}}}
      t = new MemoryTraversal(null, rootobj);
      done();
    });


    it('Creates a new object', function(){
      t.create('new', 'newobject', function (err, id){
          id.should.be.equal('new');
          t.traverse('new', function (err, obj){
              obj.should.be.equal('newobject');
          });
      });
    });
});

describe('Update an object', function(){

    var t, Traversal, rootobj;

    before(function(done){
      rootobj = {a:{b:{c:3}}}
      t = new MemoryTraversal(null, rootobj);
      done();
    });

    it('Update a object', function(){
      t.update({a1:{b1:{c1:3}}}, function (err){
          t.traverse('a1', function (err, obj){
              should.exist(obj);
          });

          t.traverse('a', function (err, obj){
              err.should.be.ok;
    //          should.strictEqual(undefined,obj);
          });


      });
    });
});

describe('Delete object', function(){

    var t, Traversal, rootobj;

    before(function(done){
      rootobj = {a:{b:{c:3}}}
      t = new MemoryTraversal(null, rootobj);
      done();
    });

    it('Destroy', function(){
      t.destroy(function (err){
          t.get(function (err, obj){
              err.should.be.equal('undefined');
          });
      });
      
    });
});

describe('List', function(){

    var t, rootobj;

    before(function(done){
      rootobj = {a:{b:{c:3}}}
      t = new MemoryTraversal(null, rootobj);
      done();
    });

    it('List works', function(){
      t.list(function (err, lst){
          lst.should.be.eql(["a"])
      });
      
    });
});

