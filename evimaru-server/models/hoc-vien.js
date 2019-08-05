const mongoose = require("mongoose");

const hocVienSchema = new mongoose.Schema({
    hocVien: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    coSoDaoTao:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"CoSoDaoTao"
    }],
})

const HocVien = mongoose.model("HocVien", hocVienSchema);
module.exports = HocVien;
