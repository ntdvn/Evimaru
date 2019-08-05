const express = require("express");
const router = express.Router({mergeParams: true});

const {createTaiLieu} = require("../handlers/tai-lieu");

router
    .route("/")
    // .get(getGiangViens)
    .post(createTaiLieu)
// router
//     .route("/:giangvienId")
//     .put(updateGiangVien)
//     .delete(deleteGiangVien)

module.exports = router;
