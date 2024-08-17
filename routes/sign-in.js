const express = require("express");
const router = express.Router();
const {
  getFooterContentOne,
  getFooterContentTwo,
} = require("../controllers/sign-in/online-banking/footer");
const {
  validateLogin,
  logout,
  verifyCookieExist,
  verifyCookieExistV2,
} = require("../controllers/sign-in/online-banking/sign-in");

const {
  transferFunds,
} = require("../controllers/sign-in/online-banking/transfer");

router.get("/footer/content-one", getFooterContentOne);
router.get("/footer/content-two", getFooterContentTwo);
router.get("/verifyCookieExistV2", verifyCookieExistV2);
router.post("/", validateLogin);
router.post("/logout", logout);
router.post("/verifyCookieExist", verifyCookieExist);
router.post("/transferFunds", transferFunds);

module.exports = router;
