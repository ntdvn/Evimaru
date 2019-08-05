const db = require("../models");

exports.createOrUpdateLienHe = async function (req, res, next) {
    try {
        var query, update, options;
        console.log(req.body);
        query = {
            coSoDaoTao: req.params.csdtId
        }
        update = {  ...req.body, coSoDaoTao: req.params.csdtId },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };


        // console.log(query);
        const lienHe = await db.LienHe.findOneAndUpdate(query, update, options, (err, lienHeExist) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(result);
                db.CoSoDaoTao.findById(lienHeExist.coSoDaoTao, (err, coSoDaoTaoFound) => {
                    if(err) console.log(err);
                    else {
                        coSoDaoTaoFound.lienHe = lienHeExist;
                        coSoDaoTaoFound.save();
                    }
                })
            }
            // else
        });
        return res.status(200).json(lienHe);
    } catch(err){
        console.log(err);
        return next(err);
    }
}
