forRest.js
==========

A traversal object and routing middleware for node.js
 
Object traversal middleware
===========================

This middleware is used to get the "context" from a fragment of HTTP URL.

This is not the model you have been looking for
===============================================
I think that the word "model" is a bit misleading when you talk about a client server architecture.
In the client you should use a REST architecture to exchange data. There are too many advantages doing this:

    - fits well with the transport protocol (HTTP)
    - it is stateless and cacheable so it can scale easily
    - it is an uniform API (only resources and verbs) and you this leads to code reuse

Let's talk about backend: we have models here too. But these models have relations between them, are structured in different ways, are stored in different DB and uses different APIS.
For all these reason I think We (developers) should start to talk about 2 differents kinds of models: frontend model and backend model.
In my opinion every web application should have (in its backend) an API that uses urls to get a frontend model and then transform in an appropriate representation.

This is the fundamental premise for using the same MVC framework in both client and server.


Mapping data in a tree structure
================================
HTTP maps resources in a tree structure.
But data backends are often structured otherwise. A record in a relational
database, for example, doesn't have a parent or children.
The traversal algorithm is used to unfold different data structures in a tree structure.
Using our previous example we can use a relation between tables to get a tree.

    myrecord/relation/newrecord

Doing this it become possible using URLs fragments to indentify automatically a data endpoint.

Implementing this algorithm automates the tedious work to get the correct data when you write a web application.

Layer of abstraction
====================
This infrastructure allows to build a layer of abstraction between actual data and "view" of them.
For example it can be quite easy to obtain on a specific URL endpoint the result of a join between data or some kind of calculation.

Working with a traversal
========================
To make everything more clear You'll work with the low level traversal API here.
You usually don't need to do this. You should use the higher level utilities explained later.
A traversal object is a wrapper around an object and it offers the API needed to work with this object.

First of all get the root traversal:
    
    var t = new Traversal(); //TODO to fix using root
    
If you don't pass arguments you should obtain the root object. This object is the root of the tree.
You can get the wrapped object with the "get" method.

    t.get(function (err, obj){
        console.log(obj);
    });

From the traversal you can get a child object doing this:

    t.traverse('id', function (err, obj){
        console.log(obj);
    });

This method "traverse" to an object and returns another object. If you want to go on
traversing you'll wrap again the object getting a new traversal:

    var t1 = new Traversal(req, obj);

Once you have the traversal you have a simple API to interact with the object. You can:

    - "get" the object wrapped
    - "create" a new object (child of the wrapped object)
    - "destroy" the wrapper object
    - "update" the wrapper object
    - "list" the ids of the children objects

How to Write a traversal
========================
A single traversal is a very simple object. Think about it is a sort of object wrapper.
This is the constructor function. It takes the request object and the object to wrap.

    var Traversal = function (req, obj){
        ...
    };


The traverse method takes an id and returns another object (using the callback).
The callback signature is cb(error, newobject):

    Traversal.prototype.traverse = function (id, cb){
        ...
    };

The get method return the actual object.

    Traversal.prototype.get = function (cb){
        ...
    };

If the traversal can create child it should have a "create" method. You can pass
the id of the child but the implementation could decide to ignore it
(it uses the HTTP POST semantic). The real id will be returned in the callback.
(cb(err, id))

    Traversal.prototype.create = function (id, obj, cb){
        ...
    };

The update method updates the current object (cb(err))

    Traversal.prototype.update = function (obj, cb){
        ...
    };

The destroy method delete the current object (cb(err)):

    Traversal.prototype.destroy = function (cb){
        ...
    };

The list method returns a list of children id. 

    Traversal.prototype.list = function (cb){
        cb(null, Object.keys(this.obj));
    };


You are not forced to define every single traversal method. For example if the
object cannot traverse to another object this method should be left undefined.

Examples
========
The first complete implementation is on the "getmemorytraversal" module. This is a simple object traversal.
Here I'll define another simple example. A traversal for mathematical additions.


    var AddTraversal = function (req, obj){
        this.req = req;
        this.obj = obj || 0;
    };

    AddTraversal.prototype.traverse = function (id, cb){
        var n = parseInt(id, 10);
        if (n){
            cb(null, this.obj + n);
        }
        else {
            cb('id is not a number', this.obj);
        }
    };

    AddTraversal.prototype.get = function (cb){
        return this.obj;
    };

And that's it ! Now Let's see how to use it:

    var t = new Traversal();
    t.get(function (err, obj){
        console.log(obj); // this will print "0"
    });
    t.traverse("3", function (err, obj) {
        console.log(obj); // this will print "3"
        var t1 = new Traversal(null, obj);
        t.traverse("4", function (err, obj) {
            console.log(obj); // this will print "7"
        });
    });




The traversal middleware
========================
If you already have your traversal you can rely on this high level API. 
...






Extending a traversal
=====================
If you want to 
Using occamsrazor.js to extend a traversal ....



TODO:

destroy method: move on parent
method obj: sync and simple version (remove?) traversal.obj

