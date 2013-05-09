forRest.js
==========

A traversal object and routing middleware for node.js
 
Object traversal middleware
===========================

This middleware is used to get the "context" from a fragment of HTTP URL.

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

Example
=======
Getting a root traversal:
    
    var t = new Traversal(req);

Traverse to an object (returning an object):

    t.traverse('id', function (err, obj){
        console.log(obj);
    });

Get a new traversal:

    var t1 = new Traversal(req, obj);

and so on ...

Listing children:


    var t = new Traversal(...);
    


