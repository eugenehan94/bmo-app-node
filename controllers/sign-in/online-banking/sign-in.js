const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Static tester account
const testerCardNumber = "12";
const testerPassword = "q";
const salt = bcrypt.genSaltSync(10);
const hashTesterCardNumber = bcrypt.hashSync(testerCardNumber, salt);
const hashTesterPassword = bcrypt.hashSync(testerPassword, salt);

// @TODO: Just for testing purposes - place in config file when DB setup complete
const privateKey = "OSBlqxHWi8lwU8HSvLsr0nRxiYpxOWe8";

const validateLogin = async (req, res, next) => {
  const { cardNumber, password } = req.body;
  const hashCardNumber = bcrypt.hashSync(String(cardNumber), salt);
  const hashPassword = bcrypt.hashSync(password, salt);
  if (
    hashCardNumber === hashTesterCardNumber &&
    hashPassword === hashTesterPassword
  ) {
    const token = jwt.sign({ test: "test" }, privateKey, { expiresIn: "1h" });
    // From cookie-session library - adds token to HttpOnly cookie
    req.session.token = token;
    // @TODO: dont sent token back - only for setting up purpose for now
    return res.status(200).json({ token, user: "tester" });
  } else {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
};

const verifyCookieExist = async (req, res, next) => {
  // A token will be present in req.session which we stored inside HttpOnly cookie.
  // req.header.cookie will never return anything so do not use
  if (req.session.token) {
    return res.status(200).send(true);
  } else {
    return res.status(200).send(false);
  }
};

const logout = async (req, res, next) => {
  req.session = null;
  return res.status(200).json({});
};

module.exports = {
  validateLogin,
  logout,
  verifyCookieExist,
};
