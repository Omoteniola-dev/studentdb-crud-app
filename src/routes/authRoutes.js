const express = require("express");
const router = express.Router();
const { createNewUser } = require("../controllers/authControllers");

router.post("/signup", createNewUser);

module.exports = router;