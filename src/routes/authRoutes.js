const express = require("express");
const router = express.Router();
const { createNewUser, loginUser } = require("../controllers/authControllers");

router.post("/signup", createNewUser);
router.post("/login", loginUser);
module.exports = router;