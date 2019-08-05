const mongoose = require("mongoose");

const lopHocSchema = new mongoose.Schema({
    tenLop: {
        type: String,
        required: true
    },
    danhSachHocVien: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    gioiHanHocVien: {
        type: Number,
        default: 30
    },
    giangVien:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    thoiGian: {
        ngayBatDau: {
            type: Date,
            // required: true,
        },
        ngayKetThuc: {
            type: Date,
            // required: true,
        },
        buoiHoc: [{
            ngayHoc: {
                type: String,
                // required: true,
            },
            gioHoc: {
                type: String,
                // required: true,
            }
        }]
    },
    tinhTrang: {
        type: String,
        default: "Chưa mở đăng ký"
    },
    description: {
        type: String,
        default: "Đang cập nhật"
    },
    soQuyetDinh: {
        type: String,
        default: "Đang cập nhật"
    },
    khoaHocCapPhep:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"khoaHocCapPhep"
    },

})

const LopHoc = mongoose.model("LopHoc", lopHocSchema);
module.exports = LopHoc;
