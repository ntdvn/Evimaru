const express = require("express");
const router = express.Router({mergeParams: true});

const {createUserInformation, getUserInformation} = require("../handlers/user-information");


// router.route("/").post(createMessage);
router
    .route("/")
    .get(getUserInformation)
    .post(createUserInformation)




module.exports = router;
