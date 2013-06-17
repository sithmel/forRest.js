
module.exports = function (authRegistry){
    return function (req, res, next){
        var view = req.view,
            context = req.context;
        
        authRegistry(req, view, context, next);

    };
};
