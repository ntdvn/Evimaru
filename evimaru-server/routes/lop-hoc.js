const express = require("express");
const router = express.Router({mergeParams: true});

const { updateLopHoc} = require("../handlers/lop-hoc");

router
    .route("/")
    .put(updateLopHoc)

module.exports = router;
