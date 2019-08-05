const db = require("../models");

exports.createUserInformation = async function (req, res, next) {
    try {
        var query = { user: req.params.userId };
        var option = { upsert: true };
        let userInformation = await db.UserInformation.findOneAndUpdate(
            query,
            req.body,
            option,
            function(err, foundUserInformation){

            }
        )
        db.User.findById(req.params.userId, function(err, foundUser){
            if(err){
                console.log(err);
            } else{
                userInformation.user = foundUser;
                userInformation.save();
                foundUser.userInformation = userInformation;
                foundUser.save();
            }
        })
        return res.status(200).json("Create or Update information success!");

    } catch(err){
        return next(err);
    }
}

exports.getUserInformation = async function (req, res, next) {
    try {
        let userInformation = await db.UserInformation.findOne(
            {user: req.params.userId}
        )
        return res.status(200).json(userInformation);
    } catch(err){
        return next(err);
    }
}
