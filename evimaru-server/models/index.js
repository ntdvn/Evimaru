const mongoose = require("mongoose");
// mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/evimaru", {
    keepAlive: true,
    useNewUrlParser: true
})

module.exports.User = require("./user");
module.exports.UserInformation = require("./user-information");
module.exports.CoQuanQuanLy = require("./co-quan-quan-ly");
module.exports.NhomKhoaHoc = require("./nhom-khoa-hoc");
module.exports.KhoaHoc = require("./khoa-hoc");
module.exports.GiangVien = require("./giang-vien");
module.exports.HocVien = require("./hoc-vien");
module.exports.KhoaHocDangKy = require("./khoa-hoc-dang-ky");

module.exports.CoSoDaoTao = require("./co-so-dao-tao");
module.exports.NhomKhoaHocCapPhep = require("./nhom-khoa-hoc-cap-phep");
module.exports.KhoaHocCapPhep = require("./khoa-hoc-cap-phep");
module.exports.BaiHoc = require("./bai-hoc");
module.exports.BaiKiemTra = require("./bai-kiem-tra");
module.exports.LopHoc = require("./lop-hoc");
module.exports.TaiLieu = require("./tai-lieu");
module.exports.LienHe = require("./lien-he");
module.exports.CoSoVatChat = require("./co-so-vat-chat");
