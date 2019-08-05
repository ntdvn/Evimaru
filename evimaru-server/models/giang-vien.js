const mongoose = require("mongoose");

const giangVienSchema = new mongoose.Schema({
    giangVien: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    coSoDaoTao:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"CoSoDaoTao"
    },
})

const GiangVien = mongoose.model("GiangVien", giangVienSchema);
module.exports = GiangVien;
