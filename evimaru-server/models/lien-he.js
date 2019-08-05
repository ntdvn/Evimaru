const mongoose = require("mongoose");
const db = require("../models");

const lienHeSchema = new mongoose.Schema({
    coSoDaoTao: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"CoSoDaoTao",
    },
    soDienThoai: {
        type: String,
        default: "Đang cập nhật"
    },
    diaChi:{
        type: String,
        default: "Đang cập nhật"
    },
    Email: {
        type: String,
        default: "Đang cập nhật"
    },
    Fax: {
        type: String,
        default: "Đang cập nhật"
    },
    Website:{
        type: String,
        default: "Đang cập nhật"
    }
})

const LienHe = mongoose.model("LienHe", lienHeSchema);
module.exports = LienHe;
