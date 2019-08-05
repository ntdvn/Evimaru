var db = require("../models");
var mongoose = require("mongoose");

// exports.createBaiHoc = async function (req, res, next) {
//     try {
//         console.log(req.body);
//
//         db.KhoaHocCapPhep.findById(req.params.khoaHocCapPhepId, (err, khoaHocCapPhepFound) => {
//             if(err){
//                 console.log(err);
//             } else {
//                 console.log(khoaHocCapPhepFound);
//             }
//         })
//     } catch(err){
//         console.log(err);
//         return next(err);
//     }
// }

exports.getBaiKiemTra = async function (req, res, next) {
    try {
        db.BaiKiemTra.findById(req.params.baiKiemTraId)
        .populate({
            path: "khoaHocCapPhep",
            model: "KhoaHocCapPhep",
        })
        .exec((err, baiKiemTraFound) => {
            if(err){

            } else {
                // console.log(baiKiemTraFound);
                return res.status(200).json(baiKiemTraFound);
            }
        })
    } catch(err) {
        return next(err);
    }
}
