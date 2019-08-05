const mongoose = require('mongoose');
const db = require("../models");
const khoaHocSchema = new mongoose.Schema({
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
  nhomKhoaHoc: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"NhomKhoaHoc"
  },

  coQuanQuanLy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"coQuanQuanLy"
  }
}, {timestamps: true});
khoaHocSchema.pre("save", async function(next) {
    try{
        if(this.isNew){
            let nhomKhoaHoc = await db.NhomKhoaHoc.findById( this.nhomKhoaHoc, (err, nhomKhoaHocFound) => {
                if(err){
                    console.log(err);
                } else {
                    nhomKhoaHocFound.khoaHoc.push(this);
                    nhomKhoaHocFound.save();
                }
            });
            // console.log(this.nhomKhoaHoc);
             nhomKhoaHocCapPhepFound = await db.NhomKhoaHocCapPhep.find({name: nhomKhoaHoc.name}, (err, nhomKhoaHocCapPhepFound) => {
                if(err){
                    console.log(err);
                } else {
                    console.log(nhomKhoaHocCapPhepFound);
                }
            });
            createDefaultValue = {
                name: this.name,
                code: this.code,
                ngayDuocCap: new Date("1990-01-01"),
                ngayHetHan: new Date("1990-01-01"),
                khoaHoc: this
            }

            await nhomKhoaHocCapPhepFound.map((nhomKhoaHocCapPhep, i) => {
                db.KhoaHocCapPhep.create(createDefaultValue, (err, khoaHocCapPhepCreated) => {
                    if(err){
                        console.log(err);
                    } else {
                        nhomKhoaHocCapPhep.khoaHoc.push(khoaHocCapPhepCreated);
                        nhomKhoaHocCapPhep.save();
                        khoaHocCapPhepCreated.nhomKhoaHoc = nhomKhoaHocCapPhep;
                        khoaHocCapPhepCreated.coSoDaoTao = nhomKhoaHocCapPhep.coSoDaoTao;
                        khoaHocCapPhepCreated.save();
                        return next();
                    }
                })
            })
        }

    } catch(err){
        // console.log(err);
        return next(err);
    }
})



const KhoaHoc = mongoose.model('KhoaHoc', khoaHocSchema);
module.exports = KhoaHoc;
