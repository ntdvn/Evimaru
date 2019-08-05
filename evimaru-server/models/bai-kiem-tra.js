const mongoose = require("mongoose");

const baiKiemTraSchema = new mongoose.Schema({
    thuTuBaiKiemTra: {
        type: Number,
        required: true
    },
    tenBaiKiemTra: {
        type: String,
        required: true,
    },
    cauHoi: [{
        noiDungCauHoi: {
            type: String,
            required: true
        },
        giaiThich: {
            type: String
        },
        cauTraLoi: [{
            noiDung: {
                type: String,
                required: true
            },
            isTrue: {
                type: Boolean
            }
        }]
    }],
    description: {
        type: String,
    },
    khoaHocCapPhep:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"khoaHocCapPhep"
    },
})

const BaiKiemTra = mongoose.model("BaiKiemTra", baiKiemTraSchema);
module.exports = BaiKiemTra;
