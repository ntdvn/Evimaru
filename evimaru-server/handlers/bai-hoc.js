var db = require("../models");
var mongoose = require("mongoose");

exports.createBaiHoc = async function (req, res, next) {
    try {
        console.log(req.body);

        db.KhoaHocCapPhep.findById(req.params.khoaHocCapPhepId, (err, khoaHocCapPhepFound) => {
            if(err){
                console.log(err);
            } else {
                console.log(khoaHocCapPhepFound);
            }
        })
    } catch(err){
        console.log(err);
        return next(err);
    }
}

exports.getBaiHoc = async function (req, res, next) {
    try {
        db.BaiHoc.findById(req.params.baiHocId)
        .populate({
            path: "khoaHocCapPhep",
            model: "KhoaHocCapPhep",
        })
        .exec((err, baiHocFound) => {
            if(err){

            } else {
                // console.log(baiHocFound);
                return res.status(200).json(baiHocFound);
            }
        })
    } catch(err) {
        return next(err);
    }
}
