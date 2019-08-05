const mongoose = require('mongoose');
const db = require("../models");
const nhomKhoaHocSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true,
        unique: true
    },
    khoaHoc:[{
		type: mongoose.Schema.Types.ObjectId,
   		ref:"KhoaHoc"
	}],
	coQuanQuanLy: {
		type: mongoose.Schema.Types.ObjectId,
   		ref:"CoQuanQuanLy"
	}
});

// nhomKhoaHocSchema.pre("save", async function(next) {
//     try{
// 		if(this.isNew){
//
// 		}
//         return next();
//     } catch(err){
//         return next(err);
//     }
// })

NhomKhoaHoc = mongoose.model('NhomKhoaHoc', nhomKhoaHocSchema);
module.exports = NhomKhoaHoc;
