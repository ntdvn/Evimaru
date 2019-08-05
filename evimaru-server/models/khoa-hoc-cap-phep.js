const mongoose = require('mongoose');
const khoaHocCapPhepSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  code: {
      type: String,
      required: true,
  },
  ngayDuocCap: {
      type: Date,
      required: true
  },
  ngayHetHan:  {
      type: Date,
      required: true
  },
  activeCourse: {
      type: Boolean,
      default: true,
  },
  soQuyetDinh: {
      type: String,
      default: "Đang cập nhật"
  },
  imageUrl: {
      type: String,
  },
  videoUrl: {
      type: String,
  },
  gioiThieu: {
      type: String,
      default: "Đang cập nhật"
  },
  whatYouLearnArr: [{
      type: String,
  }],
  requirementsArr: [{
      type: String,
  }],
  descriptionArr: [{
      type: String,
  }],
  forUserArr: [{
      type: String,
  }],
  includeArr: [{
      type: String,
  }],
  chungChiDatDuoc: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"ChungChi"
  }],
  chungChiYeuCau: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"ChungChi"
  }],
  baiHoc: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"BaiHoc"
  }],
  baiKiemTra: [{
      type: mongoose.Schema.Types.ObjectId,
      ref:"BaiKiemTra"
  }],
  lopHoc:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"LopHoc"
  }],
  nhomKhoaHoc:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"NhomKhoaHocCapPhep"
  },
  khoaHoc:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"KhoaHoc"
  },
  coSoDaoTao:{
	      type: mongoose.Schema.Types.ObjectId,
	      ref:"CoSoDaoTao"
  },
  taiLieu:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"TaiLieu"
  }]
});
module.exports = mongoose.model('KhoaHocCapPhep', khoaHocCapPhepSchema);
