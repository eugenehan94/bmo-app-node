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
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
};

module.exports = {
  validateLogin,
};
