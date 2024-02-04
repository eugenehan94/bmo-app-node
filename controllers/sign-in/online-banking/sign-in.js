const validateLogin = async (req, res, next) => {
  const testerCardNumber = 12;
  const testerPassword = "q";
  console.log("req body: ", req.body);
  console.log("TEST: ", req.body.cardNumber === testerCardNumber);
  console.log("TEST2: ", req.body.password === testerPassword);
  console.log("TEST2 type: ", req.body.password);
  if (
    req.body.cardNumber === testerCardNumber &&
    req.body.password === testerPassword
  ) {
    return res.status(200).json({ msg: "correct" });
  } else {
    return res.status(401).json({ msg: "Invalid credentials" });
  }
};

module.exports = {
  validateLogin,
};
