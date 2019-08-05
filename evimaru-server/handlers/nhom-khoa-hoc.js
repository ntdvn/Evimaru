const db = require("../models");

exports.getNhomKhoaHoc = async function(req, res, next) {
    try {

        let nhomKhoaHocs = await db.NhomKhoaHoc.find().populate("khoaHoc");
        return res.status(200).json(nhomKhoaHocs);
    } catch(err) {
        return next(err);
    }
}


exports.createNhomKhoaHoc  = async function (req, res, next) {
    // console.log(req.body);
    try {
        let nhomKhoaHoc = await db.NhomKhoaHoc.create(req.body, (err, nhomKhoaHocCreated) => {
            if(err) {
                console.log(err)
            } else {
                let csdtFound = db.CoSoDaoTao.find({}, (err, csdtsFound) => {
                    if(err) console.log(err);
                    else {
                        csdtsFound.map((csdt, i) => {
            				db.NhomKhoaHocCapPhep.create({name: nhomKhoaHocCreated.name, coSoDaoTao: csdt._id}, (err, nhomKhoaHocCapPhepCreated) => {
            					if(err){
            						console.log(err);
            					} else {
            						csdt.nhomKhoaHoc.push(nhomKhoaHocCapPhepCreated);
            						csdt.save();
                                    // console.log(nhomKhoaHocCreated);

            					}
            				})
            			})
                        return res.status(200).json(nhomKhoaHocCreated);
                    }
                });
            }
        });
    } catch(err){
        console.log("haha");
        if(err.code == 11000){
            err.message = "Địa chỉ Email đã được đăng ký bởi tài khoản khác!";
            console.log(err.message);
        }
        console.log(err);
        return next(err);
    }
}
