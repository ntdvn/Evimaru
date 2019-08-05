const express = require("express");
const router = express.Router({mergeParams: true});

const { getNhomKhoaHoc, createNhomKhoaHoc } = require("../handlers/nhom-khoa-hoc");

router
    .route("/")
    .get(getNhomKhoaHoc)
    .post(createNhomKhoaHoc)

module.exports = router;
