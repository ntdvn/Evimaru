const db = require("../models");

exports.updateKhoaHocDangKy = async function (req, res, next) {
    // console.log(req.body);
    try {
        const { khoaHocDangKyId } = req.body;
        console.log(req.body);
        var khoaHocDangKy = await db.KhoaHocDangKy.findByIdAndUpdate(khoaHocDangKyId, req.body);
        return await res.status(200).json(khoaHocDangKy);
    } catch(err){
        console.log(err);
        return next(err);
    }
}
