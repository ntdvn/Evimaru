const db = require("../models");

exports.checkCodeExist = async function (req, res, next) {
    try {
        var coQuanQuanLy = await db.CoQuanQuanLy.findOne({code: req.body.code});
        return res.status(200).json(coQuanQuanLy.name)
    } catch(err){
        return next(err);
    }
}
