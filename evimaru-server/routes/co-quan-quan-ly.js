const express = require("express");
const router = express.Router({mergeParams: true});

const {createCoQuanQuanLy, getCoQuanQuanLy,
    updateCoQuanQuanLy, deleteCoQuanQuanLy} = require("../handlers/co-quan-quan-ly");

router
    .route("/")
    .get(getCoQuanQuanLy)
    .post(createCoQuanQuanLy)
router
    .route("/:cqqlId")
    .put(updateCoQuanQuanLy)
    .delete(deleteCoQuanQuanLy)

module.exports = router;
