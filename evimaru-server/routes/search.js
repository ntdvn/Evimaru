const express = require("express");
const router = express.Router({mergeParams: true});

const { searchUserByName, searchKhoaHocByName } = require("../handlers/search");

router
    .route("/user/byname")
    .post(searchUserByName)
router
    .route("/khoahoc/byname")
    .post(searchKhoaHocByName)
// router
//     .route("/:baiHocId")
//     .get(getBaiHoc)

module.exports = router;
