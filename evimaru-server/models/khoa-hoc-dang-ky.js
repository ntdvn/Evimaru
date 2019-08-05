const mongoose = require('mongoose');
const khoaHocDangKySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    khoaHoc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "KhoaHocCapPhep"
    },
    lopHoc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LopHoc"
    },
    ketQuaHocOnline: {
        soCauTraLoiDung: {
            type: Number,
            default: 0
        },
        chiTiet: [{
            cauHoi:{
                cauTraLoi: [{
                    isTrue: {
                        type: Boolean
                    },
                    noiDung: {
                        type: String
                    }
                }],
                noiDungCauHoi: {
                    type: String
                }
            },
            dapAn: {
                type: String
            },
            isTrue: {
                type: String
            }
        }]
    },
    hocOnline: {
        type: Boolean,
        default: false
    },
    hocKhongOnline: {
        type: Boolean,
        default: false
    },
    hocTrenLop: {
        type: Boolean,
        default: false
    },
    chungChi: {
        type: String,
        default: "Chưa hoàn thành khóa học",
    },
    ngayCapChungChi: {
        type: Date,
        default: new Date(1,1,2000)
    },
    ngayHetHanChungChi: {
        type: Date,
        default: new Date(1,1,2000)
    },
    passed: {
        type: String,
        default: "Chưa đạt"
    }
}, {timestamps: true});
KhoaHocDangKy = mongoose.model('KhoaHocDangKy', khoaHocDangKySchema);
module.exports = KhoaHocDangKy;
