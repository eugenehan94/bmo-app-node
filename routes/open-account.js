const express = require("express");
const router = express.Router();
const { createAccount } = require("../controllers/open-account/home");

router.post("/create-account", createAccount);

module.exports = router;
