const db = require("../models");
const jwt = require("jsonwebtoken");

exports.logIn = async function (req, res, next) {
    try{
        let User = await db.User.findOne({
            username: req.body.username
        }).populate("coQuanQuanLy").populate("coSoDaoTao");
        let { id, username, email, profileImageUrl, role, coSoDaoTao, coQuanQuanLy } = User;

        let isMatch = await User.comparePassword(req.body.password);

        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                email,
                profileImageUrl,
                role,
                coSoDaoTao,
                coQuanQuanLy
            },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                email,
                profileImageUrl,
                role,
                coSoDaoTao,
                coQuanQuanLy,
                token
            });
        } else{
            return next({
                status: 400,
                message: "Tài khoản hoặc mật khẩu không tồn tại!"
            });
        }
    } catch(err){
        return next({status: 400, message: "Tài khoản hoặc mật khẩu không tồn tại!"});
    }
}
exports.signUp = async function (req, res, next) {
    try {
        console.log(req.body);
        var isHocVien = true;
        var newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };
        const ADMIN_CODE = 9999;
        const { code } = req.body;
        var newUser;
        if(code == ADMIN_CODE){
            newUser.role = {
                code: 5,
                name: 'Super admin'
            }
            isHocVien = false;
        } else {
            var coQuanQuanLy, coSoDaoTao;
            var coQuanQuanLy = await db.CoQuanQuanLy.findOne({code: code});
            var coSoDaoTao = await db.CoSoDaoTao.findOne({code: code});
            if(!JSONisEmpty(coQuanQuanLy)){
                newUser.role = {
                    code: 1,
                    name: 'Cơ quan quản lý'
                }
                newUser.coQuanQuanLy = coQuanQuanLy._id;
                isHocVien = false;
            }
            else if(!JSONisEmpty(coSoDaoTao)){
                newUser.role = {
                    code: 2,
                    name: 'Cơ sở đào tạo'
                }
                newUser.coSoDaoTao = coSoDaoTao._id;
                isHocVien = false;
            } else {
                newUser.role = {
                    code: 4,
                    name: 'Học viên'
                }
            }
        }
        var User = await db.User.create(newUser);

        if(isHocVien == true){
            console.log("co di vao");
            var query = {
                hoTen: req.body.hoTen,
                maSoThuyenVien: req.body.maSoThuyenVien,
                ngaySinh: req.body.ngaySinh,
                quocTich: req.body.quocTich,
                idNumber: req.body.idNumber,
            };
            // console.log(query);
            var userInformation = await db.UserInformation.create(query);
            userInformation.user = User;
            userInformation.save();
            User.userInformation = userInformation;
            User.save();
        }

        var { id, username, email, profileImageUrl, role, coSoDaoTao, coQuanQuanLy } = User;

        let token = await jwt.sign({
            id,
            username,
            email,
            profileImageUrl,
            role,
            coSoDaoTao,
            coQuanQuanLy,
        },
            process.env.SECRET_KEY
        );

        return await res.status(200).json({
            id,
            username,
            email,
            profileImageUrl,
            role,
            coSoDaoTao,
            coQuanQuanLy,
            token
        });

    } catch(err){
        console.log(err);
        if(err.code == 11000){
            err.message = "Địa chỉ Email đã được đăng ký bởi tài khoản khác!";
        }
        return next({
            status: 400,
            message: err.message
        })
    }
}

function JSONisEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
