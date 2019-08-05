const express = require("express");
const router = express.Router({mergeParams: true});

const { getKhoaHocs, createKhoaHoc } = require("../handlers/khoa-hoc");

router
    .route("/")
    .get(getKhoaHocs)
    .post(createKhoaHoc)

module.exports = router;
