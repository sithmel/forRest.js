
module.exports = function (ViewRegistry){
    return function (req, res, next){
        var context = req.context;
        
        req.view = new ViewRegistry(req, context);
        next();

    };
};
