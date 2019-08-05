const db = require("../models");
//
// exports.dangKyLopHoc = async function (req, res, next) {
//     // const { activeKey } = req.body;
//     // console.log(req.body);
//     try {
//         // db.KhoaHocCapPhep.findById(req.params.khoaHocCapPhepId, (err, khoaHocCapPhepFound) => {
//         //     if(err){
//         //
//         //     } else {
//         //         console.log(khoaHocCapPhepFound);
//         //     }
//         // })
//         db.User.findById(req.params.userId, (err, userFound) => {
//             if(err){
//                 console.log(err);
//             } else {
//                 db.KhoaHocCapPhep.findById(req.params.khoaHocCapPhepId, (err, khoaHocCapPhepFound) => {
//                     if(err){
//                         console.log(err);
//                     } else {
//
//                         db.LopHoc.findById(req.params.lopHocId, (err, lopHocFound) => {
//                             if(err){
//                                 console.log(err);
//                             } else {
//
//                                 // console.log(khoaHocCapPhepFound);
//                                 var quaTrinhHoc = khoaHocCapPhepFound.baiHoc.map((baiHoc, index, array) => {
//                                     // console.log(baiHoc);
//                                     return  {
//                                         baiHoc: baiHoc,
//                                         passed: false,
//                                     }
//                                 })
//                                 var quaTrinhKiemTra = khoaHocCapPhepFound.baiKiemTra.map((baiKiemTra, index, array) => {
//                                     // console.log(baiHoc);
//                                     return  {
//                                         baiKiemTra: baiKiemTra,
//                                         passed: false,
//                                     }
//                                 })
//
//                                 userFound.khoaHocDangHoc = [...userFound.khoaHocDangHoc, {
//                                     khoaHoc: khoaHocCapPhepFound._id,
//                                     lopHoc: lopHocFound._id,
//                                     quaTrinhHoc: quaTrinhHoc,
//                                     quaTrinhKiemTra: quaTrinhKiemTra
//                                 }]
//                                 //  .push({
//                                 //     khoaHoc: khoaHocCapPhepFound._id,
//                                 //     lopHoc: lopHocFound._id
//                                 // });
//                                 userFound.save();
//                                 lopHocFound.danhSachHocVien.push(userFound);
//                                 lopHocFound.save();
//                                 return res.status(200).json("Đăng ký khóa học thành công");
//                             }
//                         })
//                     }
//                 })
//
//
//             }
//         })
//
//     } catch(err) {
//         console.log(err);
//     }
// }
exports.dangKyLopHoc = async function (req, res, next) {
    try {
        console.log(req.body);
        db.User.findById(req.params.userId, (err, userFound) => {
            if(err) console.log(err);
            else {
                db.LopHoc.findById(req.params.lopHocId, (err, lopHocFound) => {
                    if(err) console.log(err);
                    else {
                        let query = {
                            user: req.params.userId,
                            khoaHoc: req.params.khoaHocCapPhepId,
                            lopHoc: req.params.lopHocId,
                        }
                        db.KhoaHocDangKy.create(query, (err, KhoaHocDangKyCreated) => {
                            if(err) console.log(err);
                            else {
                                lopHocFound.danhSachHocVien.push(userFound);
                                lopHocFound.save();
                                userFound.khoaHocDangKy.push(KhoaHocDangKyCreated);
                                userFound.save();
                                return res.status(200).json("Đăng ký khóa học thành công");
                            }
                        })
                    }
                })
            }
        })
    } catch(err) {
        console.log(err);
    }
}
