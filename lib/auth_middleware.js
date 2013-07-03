
module.exports = function (AuthRegistry){
    return function (req, res, next){
        var view = req.view,
            context = req.context,
            auth;
        
        while (context && !auth){
            auth = new AuthRegistry(req, view, context);
            if (auth){
                break;
            }
            context = context.parent;
        }


        if (!context || !auth){
            return next(new Error('Authorization adapter not found'));
        }

        auth.check(next);
    };
};



