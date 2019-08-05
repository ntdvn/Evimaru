const db = require("../models");

exports.getUsers = async function (req, res, next) {
    try{
        let users = await db.User.find({}, { password: 0 });
        return res.status(200).json(users);
    } catch(error){
        return next(error);
    }
}

exports.findUsersByName = async function(req, res, next) {
    try{
        let users = await db.User.find(
            { username : {$regex : `.*${req.body.username}.*`}},
            { password: 0 }
        );
        return res.status(200).json(users);
    } catch(error){
        return next(error);
    }
}

exports.findUserById = async function (req, res, next) {
    // console.log();
    try{
        let user = await db.User.findById(
            { _id : req.params.userId},
            { password: 0 }
        )
        .populate({
             path: 'khoaHocDangKy',
             model: "KhoaHocDangKy",
             populate: [
                 {
                     path: "lopHoc",
                 },
                 {
                     path: "khoaHoc",
                     model: "KhoaHocCapPhep",
                     populate: [
                        {
                            path: "baiHoc",
                        },
                        {
                            path: "baiKiemTra",
                        },
                        {
                            path: "coSoDaoTao",
                        }
                     ]
                 },
            ]
         })
         .populate({
             path: 'userInformation',
             model: "UserInformation"
         })

        return res.status(200).json({
            user
        });
    } catch(error){
        return next(error);
    }
}

// exports.passBaiHoc = async function (req, res, next) {
//     try {
//         // console.log(req.params.khoaHocCapPhepId);
//         // console.log(req.params.baiHocId);
//         db.User.findById(req.params.userId, (err, userFound) => {
//             if(err){
//                 console.log(err);
//             } else {
//                 // console.log(userFound);
//                 var khoaHocDangHoc = userFound.khoaHocDangHoc;
//                 khoaHocDangHoc = khoaHocDangHoc.map((khdh, i) => {
//                     // console.log(khdh);
//                     if(khdh.khoaHoc==req.params.khoaHocCapPhepId){
//                         quaTrinhHoc = khdh.quaTrinhHoc.map((qth, i) => {
//                             if(qth.baiHoc==req.params.baiHocId) {
//                                 let qthResult = qth;
//                                 qthResult.passed = true;
//                                 return qthResult
//                             } else return qth
//                         })
//
//                         let khdh1 = khdh;
//                         khdh1.quaTrinhHoc = quaTrinhHoc;
//
//                         return khdh1
//                     } else return khdh
//                 })
//                 userFound.khoaHocDangHoc = khoaHocDangHoc;
//                 userFound.save();
//                 return res.status(200).json("Thao tác thành công");
//             }
//         })
//     } catch(err){
//         return next(error);
//     }
// }

exports.passKhoaHoc = async function (req, res, next) {
    try {
        var khoaHocDangKy = db.KhoaHocDangKy.findOne(
            {
                user: req.params.userId,
                khoaHoc: req.params.khoaHocCapPhepId
            },
            (err, khoaHocDangKyFound) => {

                if(err) console.log(err);
                else {
                    if(khoaHocDangKyFound.hocOnline == false){
                        khoaHocDangKyFound.ketQuaHocOnline = req.body.ketQuaHocOnline;
                        khoaHocDangKyFound.hocOnline = req.body.hocOnline;
                        khoaHocDangKyFound.save();
                    }

                    return res.status(200).json("Thao tác thành công");
                }
            }
        )
    } catch(err){
        return next(error);
    }
}
