const mongoose = require("mongoose");

const baiHocSchema = new mongoose.Schema({
    thuTuBaiHoc: {
        type: Number,
        required: true
    },
    tenBaiHoc: {
        type: String,
        required: true,
    },
    pdfLinkArr: [{
        type: String,
        required: true,
    }],
    videoLinkArr: [{
        type: String,
        required: true,
    }],
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

const BaiHoc = mongoose.model("BaiHoc", baiHocSchema);
module.exports = BaiHoc;
