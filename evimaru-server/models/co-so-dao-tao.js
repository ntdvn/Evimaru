const mongoose = require("mongoose");
const db = require("../models");

const coSoDaoTaoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    coQuanQuanLy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"CoQuanQuanLy",
        // required: true,
    },
    coSoVatChat:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"CoSoVatChat"
    }],
    danhSachGiangVien: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"GiangVien"
    },
    danhSachHocVien: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    nhomKhoaHoc:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"NhomKhoaHocCapPhep"
    }],
    lopHoc: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"LopHoc"
    }],
    lienHe: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"LienHe"
    }
})

const CoSoDaoTao = mongoose.model("CoSoDaoTao", coSoDaoTaoSchema);
module.exports = CoSoDaoTao;
