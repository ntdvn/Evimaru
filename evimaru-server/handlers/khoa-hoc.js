const db = require("../models");

exports.createKhoaHoc  = async function (req, res, next) {
    // console.log(req.body);
    try {
        var khoaHoc = await db.KhoaHoc.create(
            {
                name: req.body.name,
                code: req.body.code,
                nhomKhoaHoc: req.body.nhom
            }
        )
         return await res.status(200).json(khoaHoc);
    } catch(err){
        console.log(err);
        return next(err);
    }
}

exports.getKhoaHocs = async function (req, res, next) {
    // console.log(req.body);
    try {
        var khoaHoc = await db.KhoaHoc.find({}, null, {sort: {name: 1}})
        return await res.status(200).json(khoaHoc);
    } catch(err){
        console.log(err);
        return next(err);
    }
}
