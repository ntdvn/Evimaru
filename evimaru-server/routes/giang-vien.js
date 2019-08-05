const express = require("express");
const router = express.Router({mergeParams: true});

const {createGiangVien, getGiangViens,
    updateGiangVien, deleteGiangVien} = require("../handlers/giang-vien");

router
    .route("/")
    .get(getGiangViens)
    .post(createGiangVien)
router
    .route("/:giangvienId")
    .put(updateGiangVien)
    .delete(deleteGiangVien)

module.exports = router;
