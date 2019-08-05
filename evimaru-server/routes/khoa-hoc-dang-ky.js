const express = require("express");
const router = express.Router({mergeParams: true});

const { updateKhoaHocDangKy } = require("../handlers/khoa-hoc-dang-ky");

router
    .route("/")
    // .get(getKhoaHocs)
    // .post(create)
    .put(updateKhoaHocDangKy)

module.exports = router;
