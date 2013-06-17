
module.exports = function (req, res, next){
        if (typeof req.view !== "undefined" && req.view.render instanceof Function){
            req.view.render();
        }
        else {
             next();//??
        }

    };
};
