const mongoose = require('mongoose');
const db = require("../models");

const taiLieuSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  publishingYear: {
      type: Date,
      default: Date.now
  },
  publisher: {
      type: String,
      default: "Đang cập nhật"
  },
  author: {
      type: String,
      default: "Đang cập nhật"
  },
  usingFor:{
      type: String,
      default: "Đang cập nhật"
  },
  khoaHoc:{
     type: mongoose.Schema.Types.ObjectId,
     ref:"KhoaHocCapPhep"
  },
  coSoDaoTao:{
	      type: mongoose.Schema.Types.ObjectId,
	      ref:"CoSoDaoTao"},
});

taiLieuSchema.pre('save', async function(next){
    try {
        let khoaHocCapPhepFound = await db.KhoaHocCapPhep.findById(this.khoaHoc);
        khoaHocCapPhepFound.taiLieu.push(this);
        khoaHocCapPhepFound.save();
    } catch(err) {
        return next(err);
    }
})

TaiLieu = mongoose.model('TaiLieu', taiLieuSchema);
module.exports = TaiLieu;
