
module.exports = function (ViewRegistry){
    return function (req, res, next){
        var context = req.context;
        try {
            req.view = new ViewRegistry(req, context);
        }
        catch (e){
            return res.send(404);
        }
        next();

    };
};
