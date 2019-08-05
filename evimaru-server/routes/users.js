const express = require("express");
const router = express.Router({mergeParams: true});

const { getUsers, findUsersByName, findUserById, passKhoaHoc } = require("../handlers/users");


// router.route("/").post(createMessage);
router
    .route("/")
    .get(getUsers)

// router
//     .route("/:userId/pass/khoahoccapphep/:khoaHocCapPhepId/baihoc/:baiHocId")
//     .post(passBaiHoc)

router
    .route("/:userId/pass/khoahoccapphep/:khoaHocCapPhepId/baiKiemTra/:baiKiemTraId")
    .post(passKhoaHoc)

router
    .route("/findname")
    .post(findUsersByName)
router
    .route("/:userId")
    .get(findUserById)




module.exports = router;
