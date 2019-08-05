const db = require("../models");

exports.getCoQuanQuanLy = async function (req, res, next) {
    try {
        let coQuanQuanLy = await db.CoQuanQuanLy.find();
        return res.status(200).json(coQuanQuanLy);
    } catch(err){
        return next(err);
    }
}

exports.createCoQuanQuanLy = async function (req, res, next) {
    try {
        let coQuanQuanLy = await db.CoQuanQuanLy.create(req.body);
        return res.status(200).json(coQuanQuanLy);
    } catch(err){
        return next(err);
    }
}

exports.updateCoQuanQuanLy = async function (req, res, next) {
    try {
        let coQuanQuanLy = await db.CoQuanQuanLy.findByIdAndUpdate(req.params.cqqlId, req.body.cqql,{ 'new': true});
        return res.status(200).json(coQuanQuanLy);
    } catch(err){
        return next({status: 400, message: "hahahah"});
    }
}

exports.deleteCoQuanQuanLy = async function (req, res, next) {
    try {
        let foundCoQuanQuanLy = await db.CoQuanQuanLy.findById(req.params.cqqlId);
        await foundCoQuanQuanLy.remove();
        return res.status(200).json(foundCoQuanQuanLy);
    } catch(err){
        return next(err);
    }
}
