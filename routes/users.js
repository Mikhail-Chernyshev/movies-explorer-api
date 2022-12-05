const router = require("express").Router();

const { editMe, getMe } = require("../controllers/users");

router.get("/me", getMe);

router.patch("/me", editMe);

module.exports = router;
