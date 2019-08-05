const express = require("express");
const router = express.Router({mergeParams: true});

const { createBaiHoc, getBaiHoc } = require("../handlers/bai-hoc");

router
    .route("/")
    .post(createBaiHoc)
router
    .route("/:baiHocId")
    .get(getBaiHoc)

module.exports = router;
