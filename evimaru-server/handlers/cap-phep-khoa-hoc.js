var db = require("../models");
var mongoose = require("mongoose");

exports.capPhepKhoaHoc = async function (req, res, next) {
    console.log(req.body);
    console.log(req.params.khoaHocId);
    try {
        db.KhoaHoc.findById(req.params.khoaHocId, (err, khoaHocFound) => {
            if(err){
                console.log(err);
            } else {
                db.KhoaHocCapPhep.findById(req.body.khoaHocCapPhep, (err, khoaHocCapPhepFound) => {
                    if(err){
                        console.log(err);
                    } else {
                        khoaHocCapPhepFound.soQuyetDinh = req.body.soQuyetDinh;
                        khoaHocCapPhepFound.ngayDuocCap = req.body.ngayDuocCap;
                        khoaHocCapPhepFound.ngayHetHan = req.body.ngayHetHan;
                        khoaHocCapPhepFound.save();
                        return res.status(200).json("ok");
                    }
                })
            }
        })
    } catch(err){
        console.log(err);
        return next(err);
    }
}
