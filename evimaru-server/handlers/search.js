var db = require("../models");
var mongoose = require("mongoose");

exports.searchUserByName = async function (req, res, next) {
    try {
        // console.log(req.body);

        const userInformationFounds = await db.UserInformation.find({hoTen: { "$regex": `${req.body.hoTen}`, "$options": "i" } })
        .populate(
            {
                path: "user",
                model: "User",
                populate: [
                    {
                        path: "khoaHocDangKy",
                        model: "KhoaHocDangKy",
                        populate: [
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
                ]
            }
        );
        return res.status(200).json(userInformationFounds);
    } catch(err){
        console.log(err);
        return next(err);
    }
}

exports.searchKhoaHocByName = async function (req, res, next) {
    try {
        const KhoaHocCapPhepFounds = await db.KhoaHocCapPhep.find({name: req.body.khoaHoc})
        .populate(
            {
                path: "coSoDaoTao",
                model: "CoSoDaoTao"
            }
        )
        return res.status(200).json(KhoaHocCapPhepFounds);
    } catch(err){
        console.log(err);
    }
}
