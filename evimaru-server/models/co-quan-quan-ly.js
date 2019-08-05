const mongoose = require("mongoose");

const coQuanQuanLySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    coSoDaoTao:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"CoSoDaoTao"
    }],
    nhomKhoaHoc: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"NhomKhoaHoc"
    }]
})

const CoQuanQuanLy = mongoose.model("CoQuanQuanLy", coQuanQuanLySchema);
module.exports = CoQuanQuanLy;
