const express = require("express");
const router = express.Router({mergeParams: true});

const {createCoSoDaoTao, getCoSoDaoTaos,
    updateCoSoDaoTao, deleteCoSoDaoTao, getCoSoDaoTao} = require("../handlers/co-so-dao-tao");

router
    .route("/")
    .get(getCoSoDaoTaos)
    .post(createCoSoDaoTao)
router
    .route("/:csdtId")
    .get(getCoSoDaoTao)
    .put(updateCoSoDaoTao)
    .delete(deleteCoSoDaoTao)

module.exports = router;
