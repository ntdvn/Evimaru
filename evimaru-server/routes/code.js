const express = require("express");
const router = express.Router();
const { checkCodeExist } = require("../handlers/code");

router.post("/", checkCodeExist);

module.exports = router;
