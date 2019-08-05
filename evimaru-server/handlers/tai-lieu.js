const db = require("../models");

exports.createTaiLieu = async function (req, res, next) {
    try {
        var query = {
            ...req.body,
            khoaHoc: req.params.khoaHocCapPhepId
        }
        const taiLieu = await db.TaiLieu.create(query);
        return res.status(200).json(taiLieu);
    } catch(err){
        return next(err);
    }
}
