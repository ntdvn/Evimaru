const db = require("../models");

exports.getCoSoDaoTaos  = async function (req, res, next) {
    try {
        let coSoDaoTaos = await db.CoSoDaoTao.find()
        .populate("coSoVatChat")
        .populate("nhomKhoaHoc")
        .populate({
             path: 'nhomKhoaHoc',
             populate:
             {
               path: 'khoaHoc',
               populate:
               [
                   {
                     path: 'coSoDaoTao'
                   },
                   {
                     path: 'lopHoc',
                     populate:
                     [
                         {
                             path: 'giangVien',
                             populate:
                             [
                                 {
                                     path: "userInformation",
                                     model: "UserInformation",
                                 }
                             ]
                         },
                         {
                             path: 'danhSachHocVien',
                             populate:
                             [
                                 {
                                     path: "khoaHocDangKy",
                                     model: "KhoaHocDangKy",
                                     populate: [
                                         // {
                                         //     path: 'user',
                                         //     model: 'User'
                                         // }
                                         {
                                             path: "khoaHoc",
                                             model: "KhoaHocCapPhep",
                                             populate: [
                                                 {
                                                     path: "coSoDaoTao",
                                                     model: "CoSoDaoTao"
                                                 }
                                             ]
                                         },
                                         {
                                             path: "lopHoc",
                                             model: "LopHoc"
                                         }
                                     ]
                                 },
                                 {
                                     path: "userInformation",
                                     model: "UserInformation",
                                 }
                             ]
                         },
                     ]
                    },
                    {
                        path: 'baiHoc',
                        // model: "BaiHoc"
                    },
                    {
                        path: 'baiKiemTra',
                        // model: "BaiHoc"
                    },
                    {
                        path: 'taiLieu',
                        // model: "BaiHoc"
                    },
                ]
           },
        })
        .populate({
            path: 'danhSachGiangVien',
            model: "GiangVien",
            populate: {
                path: "giangVien",
                model: "User",
                populate: {
                    path: "userInformation",
                    model: "UserInformation",

                }
            }
        })
        .populate({
            path: 'lienHe',
            model: 'LienHe'
        })

        return res.status(200).json(coSoDaoTaos);
    } catch(err){
        return next(err);
    }
}

exports.getCoSoDaoTao  = async function (req, res, next) {
    try {
        // console.log("heher");
        let coSoDaoTao = await db.CoSoDaoTao.findById(req.params.csdtId)
        .populate("coSoVatChat")
        .populate("nhomKhoaHoc")
        .populate({
             path: 'nhomKhoaHoc',
             populate:
             {
               path: 'khoaHoc',
               populate:
               [
                   {
                     path: 'lopHoc',
                     populate:
                     [
                         {
                             path: 'giangVien',
                             populate:
                             [
                                 {
                                     path: "userInformation",
                                     model: "UserInformation",
                                 }
                             ]
                         },
                         {
                             path: 'danhSachHocVien',
                             populate:
                             [
                                 {
                                     path: "khoaHocDangKy",
                                     model: "KhoaHocDangKy",
                                     populate:
                                     [
                                         {
                                             path: "khoaHoc",
                                             model: "KhoaHocCapPhep",
                                             populate: [
                                                 {
                                                     path: "coSoDaoTao",
                                                     model: "CoSoDaoTao"
                                                 }
                                             ]
                                         },
                                         {
                                             path: "lopHoc",
                                             model: "LopHoc"
                                         }
                                     ]
                                 },
                                 {
                                     path: "userInformation",
                                     model: "UserInformation",
                                 }
                             ]
                         },
                     ]
                    },
                    {
                        path: 'baiHoc',
                        // model: "BaiHoc"
                    },
                    {
                        path: 'baiKiemTra',
                        // model: "BaiHoc"
                    },
                    {
                        path: 'taiLieu',
                        // model: "BaiHoc"
                    },
                ]
           },
        })
        .populate({
            path: 'danhSachGiangVien',
            model: "GiangVien",
            populate: {
                path: "giangVien",
                model: "User",
                populate: {
                    path: "userInformation",
                    model: "UserInformation",

                }
            }
        })
        .populate({
            path: 'lienHe',
            model: 'LienHe'
        })
        return await res.status(200).json(coSoDaoTao);
    } catch(err){
        return next(err);
    }
}

exports.createCoSoDaoTao = async function (req, res, next) {
    console.log(req.body);
    try {
        let coSoDaoTao = await db.CoSoDaoTao.create(req.body, (err, coSoDaoTaoCreated) => {
            if(err) console.log(err);
            else {
                db.LienHe.create({}, (err, lienHeCreated) => {
                    if(err) console.log(err);
                    else {
                        coSoDaoTaoCreated.lienHe = lienHeCreated;
                        coSoDaoTaoCreated.save();
                        lienHeCreated.coSoDaoTao = coSoDaoTaoCreated;
                        lienHeCreated.save();
                    }
                });
            }
        });


        return res.status(200).json(coSoDaoTao);
    } catch(err){
        console.log(err);
        return next(err);
    }
}

exports.updateCoSoDaoTao = async function (req, res, next) {
    console.log(req.body.csdt);
    try {
            let coSoDaoTao = await db.CoSoDaoTao.findByIdAndUpdate(req.params.csdtId, req.body.csdt,{ 'new': true});
            return res.status(200).json(coSoDaoTao);
    } catch(err){
        console.log(err);
        return next({status: 400, message: "hahahah"});
    }
}

exports.deleteCoSoDaoTao = async function (req, res, next) {
    try {
        let foundCoSoDaoTao = await db.CoSoDaoTao.findById(req.params.csdtId);
        await foundCoSoDaoTao.remove();
        return res.status(200).json(foundCoSoDaoTao);
    } catch(err){
        return next(err);
    }
}
