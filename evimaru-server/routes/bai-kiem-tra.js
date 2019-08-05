const express = require("express");
const router = express.Router({mergeParams: true});

const { getBaiKiemTra } = require("../handlers/bai-kiem-tra");

// router
//     .route("/")
//     .post(createBaiHoc)
router
    .route("/:baiKiemTraId")
    .get(getBaiKiemTra)

module.exports = router;
