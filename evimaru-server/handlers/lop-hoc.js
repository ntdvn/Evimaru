const db = require("../models");

exports.updateLopHoc = async function (req, res, next) {
    try {
        console.log(req.params.lopHocId);
        var lopHoc = await db.LopHoc.findByIdAndUpdate(req.params.lopHocId, req.body);
        return await res.status(200).json(lopHoc);
    } catch(err){
        console.log(err);
        return next(err);
    }
}
