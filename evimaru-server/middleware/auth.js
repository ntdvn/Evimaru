require("dotenv").load();
const jwt = require("jsonwebtoken");

// user is logged - Authentication require token
exports.loginRequired = function(req, res, next) {
    try{

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded){

                return next();
            } else{
                return next({
                    status: 401,
                    message: "Please log in first"
                });
            }
        });
    } catch(err){
        return next({
            status: 401,
            message: "Please log in first"
        })
    }
};

//pass loginRequired but compare user id vs token decode id
exports.ensureCorrectUser = function(req, res, next) {
    try{

        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded && decoded.id === req.params.userId){
                return next();
            } else{

                return next({
                    status: 401,
                    message: "Unauthorized"
                })
            }
        });
    } catch(err){
        return next({
            status: 401,
            message: "Unauthorized"
        })
    }
}

// user correct - Authorization
