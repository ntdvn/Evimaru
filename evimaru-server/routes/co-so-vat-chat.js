const express = require("express");
const router = express.Router({mergeParams: true});

const {createCoSoVatChat, getCoSoVatChats,
    updateCoSoVatChat, deleteCoSoVatChat} = require("../handlers/co-so-vat-chat");

router
    .route("/")
    .get(getCoSoVatChats)
    .post(createCoSoVatChat)
router
    .route("/:csvcId")
    .put(updateCoSoVatChat)
    .delete(deleteCoSoVatChat)

module.exports = router;
