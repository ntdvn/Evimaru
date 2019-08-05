const db = require("../models");

exports.getCoSoVatChats = async function (req, res, next) {
    try {
        let coSoVatChats = await db.CoSoVatChat.find();
        return res.status(200).json(coSoVatChats);
    } catch(err){
        return next(err);
    }
}

exports.createCoSoVatChat = async function (req, res, next) {
    try {
        // console.log(req.body);
        let coSoVatChat = await db.CoSoVatChat.create(req.body, (err, coSoVatChatCreated) => {
            if(err) {
                console.log(err);
            } else {
                db.CoSoDaoTao.findById(req.params.csdtId, (err, csdtFound) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(csdtFound);
                        csdtFound.coSoVatChat.push(coSoVatChatCreated);
                        csdtFound.save();

                        coSoVatChatCreated.coSoDaoTao = csdtFound;
                        coSoVatChatCreated.save();
                        // console.log("HHHHHHHHHHH"+coSoVatChatCreated);
                        return res.status(200).json(coSoVatChatCreated);

                    }
                })
            }
        });


    } catch(err){
        console.log(err);
        return next(err);
    }
}

exports.updateCoSoVatChat = async function (req, res, next) {
    try {
        let coSoVatChat = await db.CoSoVatChat.findByIdAndUpdate(
            req.params.csvcId,
            req.body.csvc,{ 'new': true}
         );
        return res.status(200).json(coSoVatChat);
    } catch(err){
        return next(err);
    }
}

exports.deleteCoSoVatChat = async function (req, res, next) {
    try {
        let foundCoSoVatChat = await db.CoSoVatChat.findById(req.params.csvcId);
        await foundCoSoVatChat.remove();
        return res.status(200).json(foundCoSoVatChat);
    } catch(err){
        return next(err);
    }
}
