
module.exports = function (viewRegistry){
    return function (req, res, next){
        var name = req.url,
            context = req.context;
        
        req.view = viewRegistry(name, req, context);
        next();

    };
};
