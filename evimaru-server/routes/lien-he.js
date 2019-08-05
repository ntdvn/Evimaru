const express = require("express");
const router = express.Router({mergeParams: true});

const { createOrUpdateLienHe} = require("../handlers/lien-he");

router
    .route("/")
    .post(createOrUpdateLienHe)

module.exports = router;
