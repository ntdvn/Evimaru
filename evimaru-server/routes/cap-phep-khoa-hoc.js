const express = require("express");
const router = express.Router({mergeParams: true});

const { capPhepKhoaHoc } = require("../handlers/cap-phep-khoa-hoc");

router
    .route("/")
    .post(capPhepKhoaHoc)

module.exports = router;
