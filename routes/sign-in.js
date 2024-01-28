const express = require("express");
const router = express.Router();
const {
  getFooterContentOne,
  getFooterContentTwo,
} = require("../controllers/sign-in/footer");

router.get("/footer/content-one", getFooterContentOne);
router.get("/footer/content-two", getFooterContentTwo);

module.exports = router;
