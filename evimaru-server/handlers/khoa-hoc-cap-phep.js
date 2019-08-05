const db = require("../models");

exports.updateChiTietKhoaHoc  = async function (req, res, next) {
    // console.log(req.body);
    // console.log(req.params.khoaHocCapPhepId);
    const { imageUrl, videoUrl, introduction, whatYouLearnArr, requirementsArr, descriptionArr,
            forUserArr, includeArr } = req.body;
    try {
        db.KhoaHocCapPhep.findById(req.params.khoaHocCapPhepId, (err, khoaHocCapPhepFound) => {
            if(err){
                console.log(err);
            } else {
                khoaHocCapPhepFound.imageUrl = imageUrl;
                khoaHocCapPhepFound.videoUrl = videoUrl;
                khoaHocCapPhepFound.gioiThieu = introduction;
                khoaHocCapPhepFound.whatYouLearnArr = whatYouLearnArr;
                khoaHocCapPhepFound.requirementsArr = requirementsArr;
                khoaHocCapPhepFound.descriptionArr = descriptionArr;
                khoaHocCapPhepFound.forUserArr = forUserArr;
                khoaHocCapPhepFound.includeArr = includeArr;
                khoaHocCapPhepFound.save();
            }
        })
         return await res.status(200).json("Thành công");
    } catch(err){
        console.log(err);
        return next(err);
    }
}

exports.createBaiHoc = async function (req, res, next) {
    try {
        // console.log("BaiHoc:");
        // console.log(req.body);
        // console.log(req.params.khoaHocCapPhepId);
        const { unitName, pdfLinkArr, videoLinkArr, description } = req.body;
        var cauHoiArr = req.body.cauHoi.map((ch, i) => {
            return {
                noiDungCauHoi: ch.noiDungCauHoi,
                giaiThich: ch.giaiThich,
                cauTraLoi: [
                    { noiDung: ch.dapAn1, isTrue: ch.checkDapAn1 },
                    { noiDung: ch.dapAn2, isTrue: ch.checkDapAn2 },
                    { noiDung: ch.dapAn3, isTrue: ch.checkDapAn3 },
                    { noiDung: ch.dapAn4, isTrue: ch.checkDapAn4 },
                ]
            }
        })
        // console.log(cauHoiArr);
        db.KhoaHocCapPhep.findById(req.params.khoaHocCapPhepId, (err, khoaHocCapPhepFound) => {
            if(err){
                console.log(err);
            } else {
                db.BaiHoc.countDocuments({khoaHocCapPhep: khoaHocCapPhepFound._id}, (err, count) => {
                    if(err){

                    } else {
                        let query = {
                            thuTuBaiHoc:  count,
                            tenBaiHoc: unitName,
                            pdfLinkArr: pdfLinkArr,
                            videoLinkArr: videoLinkArr,
                            cauHoi: cauHoiArr,
                            description: description
                        }

                        db.BaiHoc.create(query, (err, baiHocCreated) => {
                            if(err){
                                console.log(err);
                            } else {
                                baiHocCreated.khoaHocCapPhep = khoaHocCapPhepFound;
                                baiHocCreated.save();
                                khoaHocCapPhepFound.baiHoc.push(baiHocCreated);
                                khoaHocCapPhepFound.save();
                            }
                        })
                    }
                })
                // console.log(khoaHocCapPhepFound);
            }
        })
        return await res.status(200).json("Thành công");
    } catch(err){
        console.log(err);
        return next(err);
    }
}

exports.createBaiKiemTra = async function (req, res, next) {
    try {
        // console.log("BaiKiemTra:");
        // console.log(req.body);
        const { tenBaiKiemTra, description, cauHoi } = req.body;
        var cauHoiArr = req.body.cauHoi.map((ch, i) => {
            return {
                noiDungCauHoi: ch.noiDungCauHoi,
                cauTraLoi: [
                    { noiDung: ch.dapAn1, isTrue: ch.checkDapAn1 },
                    { noiDung: ch.dapAn2, isTrue: ch.checkDapAn2 },
                    { noiDung: ch.dapAn3, isTrue: ch.checkDapAn3 },
                    { noiDung: ch.dapAn4, isTrue: ch.checkDapAn4 },
                ]
            }
        })

        db.KhoaHocCapPhep.findById(req.params.khoaHocCapPhepId, (err, khoaHocCapPhepFound) => {
            if(err){
                console.log(err);
            } else {
                db.BaiKiemTra.countDocuments({khoaHocCapPhep: khoaHocCapPhepFound._id}, (err, count) => {
                    if(err){

                    } else {
                        let query = {
                            thuTuBaiKiemTra:  count,
                            tenBaiKiemTra: tenBaiKiemTra,
                            description: description,
                            cauHoi: cauHoiArr,
                        }

                        db.BaiKiemTra.create(query, (err, baiKiemTraCreated) => {
                            if(err){
                                console.log(err);
                            } else {
                                baiKiemTraCreated.khoaHocCapPhep = khoaHocCapPhepFound;
                                baiKiemTraCreated.save();
                                khoaHocCapPhepFound.baiKiemTra.push(baiKiemTraCreated);
                                khoaHocCapPhepFound.save();
                            }
                        })
                    }
                })
            }
        })
        return await res.status(200).json("Thành công");
    } catch(err){
        console.log(err);
        return next(err);
    }
}

exports.createLopHoc = async function (req, res, next) {
    try {
        // console.log("LopHoc:");
        // console.log(req.body);
        const { tenLop, soQuyetDinh, description, thoiGian, giangVienArr, gioiHanHocVien } = req.body;
        db.KhoaHocCapPhep.findById(req.params.khoaHocCapPhepId, (err, khoaHocCapPhepFound) => {
            if(err){
                console.log(err);
            } else {
                db.User.find(
                    { "_id": { $in: giangVienArr } },
                (err, foundUsers) => {
                    let query = {
                        tenLop:  tenLop,
                        soQuyetDinh: soQuyetDinh,
                        description: description,
                        thoiGian: thoiGian,
                        giangVien: foundUsers,
                        gioiHanHocVien: gioiHanHocVien
                    }
                    db.LopHoc.create(query, (err, lopHocCreated) => {
                        if(err){
                            console.log(err);
                        } else {
                            lopHocCreated.khoaHocCapPhep = khoaHocCapPhepFound;
                            lopHocCreated.save();

                            khoaHocCapPhepFound.lopHoc.push(lopHocCreated);
                            khoaHocCapPhepFound.save();

                            foundUsers.map((user, i) => {
                                user.lopHocPhuTrach.push(lopHocCreated);
                                user.save();
                            })
                        }
                    })

                })
            }
        })
        return await res.status(200).json("Thành công");
    } catch(err){
        console.log(err);
        return next(err);
    }
}

exports.updateLopHoc = async function (req, res, next) {
    try {
        console.log(req.body);
    } catch(err) {
        console.log(err);
        return next(err);
    }
}

exports.activeCourse = async function (req, res, next) {
    const { activeKey } = req.body;
    try {
        db.KhoaHocCapPhep.findById(req.params.khoaHocCapPhepId, (err, khoaHocCapPhepFound) => {
            if(err){

            } else {
                khoaHocCapPhepFound.activeCourse = activeKey;
                khoaHocCapPhepFound.save();
            }
        })
        return await res.status(200).json("Thành công");
    } catch(err) {
        console.log(err);
    }
}
