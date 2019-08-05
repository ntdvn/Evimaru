const mongoose = require('mongoose');
const nhomKhoaHocCapPhepSchema = new mongoose.Schema({
	name: {
        type: String,
        required: true
    },
	coSoDaoTao:{
		type: mongoose.Schema.Types.ObjectId,
	  	ref:"CoSoDaotao"
	},
    khoaHoc:[{
 	   type: mongoose.Schema.Types.ObjectId,
 	   ref:"KhoaHocCapPhep"}]
});

NhomKhoaHocCapPhep = mongoose.model('NhomKhoaHocCapPhep', nhomKhoaHocCapPhepSchema);
module.exports = NhomKhoaHocCapPhep;
