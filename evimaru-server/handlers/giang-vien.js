const db = require("../models");

exports.getGiangViens = async function (req, res, next) {
    try {
        let giangViens = await db.GiangVien.find();
        return res.status(200).json(giangViens);
    } catch(err){
        return next(err);
    }
}

exports.createGiangVien = async function (req, res, next) {
    try {
        // console.log(req.body);
        var chungChi = req.body.chungChiKhac.split("\n");
        var monHoc = req.body.monHoc.split("\n");

        var user = await db.User.create({
            email: req.body.email,
            username: req.body.username,
            password: "1",
            role: {
                code: 3,
                name: "Giảng Viên"
            },
            coSoDaoTao: req.params.csdtId,
        }, (err, userCreated) => {
            if(err){
                console.log(err);
            } else {
                let userInformation = db.UserInformation.create({
                    hoTen: req.body.hoTen,
                    ngaySinh: req.body.ngaySinh,
                    hocHam: req.body.hocHam,
                    hocVi: req.body.hocVi,
                    chungChi: chungChi,
                    monHoc: monHoc,
                    tiengAnh: req.body.tiengAnh,
                    tinHoc: req.body.tinHoc
                }, (err, userInformationCreated) => {
                    if(err){
                        console.log(err);
                    } else {
                        userCreated.userInformation = userInformationCreated;
                        userCreated.save();
                        userInformationCreated.user = userCreated;
                        userInformationCreated.save();
                        db.CoSoDaoTao.findById(req.params.csdtId, (err, csdtFound) => {
                            if(err){
                                console.log(err);
                            } else {
                                var query = { coSoDaoTao: csdtFound._id },
                                    update = { expire: new Date() },
                                    options = { upsert: true, new: true, setDefaultsOnInsert: true };

                                db.GiangVien.findOneAndUpdate(query, update, options, function(error, danhSachGiangVienFound) {
                                    if(err){
                                        console.log(err);
                                    } else {
                                        danhSachGiangVienFound.giangVien.push(userCreated);
                                        danhSachGiangVienFound.coSoDaoTao=csdtFound;
                                        danhSachGiangVienFound.save();
                                        csdtFound.danhSachGiangVien=danhSachGiangVienFound;
                                        csdtFound.save();

                                    }
                                });

                            }
                        })
                    }
                })
            }
            return res.status(200).json(userCreated);
        })

        if(user) {
            console.log("haha");

        }
    } catch(err){
        console.log(err);
        return next(err);
    }
}

exports.updateGiangVien = async function (req, res, next) {
    try {
        let giangVien = await db.CoSoVatChat.findByIdAndUpdate(
            req.params.csvcId,
            req.body.csvc,{ 'new': true}
         );
        return res.status(200).json(giangVien);
    } catch(err){
        return next(err);
    }
}

exports.deleteGiangVien = async function (req, res, next) {
    try {
        let giangVienFound = await db.CoSoVatChat.findById(req.params.csvcId);
        await giangVienFound.remove();
        return res.status(200).json(giangVienFound);
    } catch(err){
        return next(err);
    }
}
