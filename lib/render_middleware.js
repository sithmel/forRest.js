
module.exports = function (req, res, next){
    if (typeof req.view !== "undefined" && req.view.render instanceof Function){
        req.view.render(res);
    }
    else {
         next(new Error('View is undefined'));
    }

};

