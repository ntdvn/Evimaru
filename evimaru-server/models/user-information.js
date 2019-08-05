const mongoose = require("mongoose");

const userInformationSchema = mongoose.Schema({
    hoTen: {
        type: String,
        required: true
    },
    ngaySinh: {
        type: Date,
        required: true
    },
    queQuan: {
        type: String,
        default: "Chưa cập nhật"
    },
    quocTich: {
        type: String,
        default: "Chưa cập nhật"
    },
    idNumber: {
        type: String,
        default: "Chưa cập nhật"
    },
    maSoThuyenVien: {
        type: String,
        default: "Chưa cập nhật"
        // required: true
    },
    soDienThoai: {
        type: String,
        default: "Chưa cập nhật"
        // required: true
    },
    hocHam: {
        type: String,
        default: "Không có"
    },
    hocVi: {
        type: String,
        default: "Không có"
    },
    tiengAnh: {
        type: String,
        default: "Không có"
    },
    tinHoc: {
        type: String,
        default: "Không có"
    },
    chungChi: [{
        type: String
    }],
    monHoc: [{
        type: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const UserInformation = mongoose.model("UserInformation", userInformationSchema);

module.exports = UserInformation;
