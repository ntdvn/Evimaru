const express = require("express");
const router = express.Router({mergeParams: true});

const { dangKyLopHoc } = require("../handlers/dang-ky-hoc");

router
    .route("/")
    .post(dangKyLopHoc)

module.exports = router;
