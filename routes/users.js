const router = require("express").Router();

const { editMe, getMe } = require("../controllers/users");
const { validateEditUser } = require("../utils/validate");

router.get("/me", getMe);

router.patch("/me", validateEditUser, editMe);

module.exports = router;
