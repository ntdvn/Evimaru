const express = require("express");
const router = express.Router({mergeParams: true});

const {
    updateChiTietKhoaHoc,
    createBaiHoc,
    createBaiKiemTra,
    createLopHoc,
    activeCourse,
} = require("../handlers/khoa-hoc-cap-phep");

router
    .route("/chitiet")
    .post(updateChiTietKhoaHoc)

router
    .route("/baiHoc")
    .post(createBaiHoc)
router
    .route("/baikiemtra")
    .post(createBaiKiemTra)

router
    .route("/lophoc")
    .post(createLopHoc)

router
    .route("/activecourse")
    .post(activeCourse)

module.exports = router;
