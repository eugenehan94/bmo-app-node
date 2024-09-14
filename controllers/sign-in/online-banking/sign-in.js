const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mySqlConnection = require("../../../libraries/mysql");
// Static tester account
// const testerCardNumber = "12";
// const testerPassword = "q";
// const salt = bcrypt.genSaltSync(10);
// const hashTesterCardNumber = bcrypt.hashSync(testerCardNumber, salt);
// const hashTesterPassword = bcrypt.hashSync(testerPassword, salt);

// @TODO: Just for testing purposes - place in config file when DB setup complete
const privateKey = "OSBlqxHWi8lwU8HSvLsr0nRxiYpxOWe8";

const validateLogin = async (req, res, next) => {
  const { cardNumber, password } = req.body;
  mySqlConnection.query(
    `SELECT * FROM bmo_project.customer WHERE CardNumber = ${cardNumber}`,
    (error, result) => {
      if (error) {
        res
          .status(500)
          .json({ error: "Database error", message: error.message });
      }
      if (result.length === 0) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
      if (result.length >= 1) {
        let passwordDb = result.map(({ Password }) => Password).toString();
        let user = result[0];
        let userAccounts;
        delete user.Password;
        if (passwordDb === password) {
          const token = jwt.sign({ cardNumber: cardNumber }, privateKey, {
            expiresIn: "1h",
          });

          mySqlConnection.query(
            `SELECT * FROM bmo_project.accounts WHERE CustomerID = ${user.CustomerID}`,
            (error, result) => {
              userAccounts = result;
              // From cookie-session library - adds token to HttpOnly cookie
              // req.session.token = token;
              // The code above seems to malform the jwt, the one below doesn't
              // @TODO see if we can remove the req.session.token and refactor as well
              res.cookie("jwt", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 3600000,
              });

              // @TODO: dont sent token back - only for setting up purpose for now
              return res
                .status(200)
                .json({ token, user: user, userAccounts: userAccounts });
            }
          );
        } else {
          return res.status(401).json({ msg: "Invalid credentials" });
        }
      }
    }
  );

  // const hashCardNumber = bcrypt.hashSync(String(cardNumber), salt);
  // const hashPassword = bcrypt.hashSync(password, salt);
  // if (
  //   hashCardNumber === hashTesterCardNumber &&
  //   hashPassword === hashTesterPassword
  // ) {
  //   const token = jwt.sign({ test: "test" }, privateKey, { expiresIn: "1h" });
  //   // From cookie-session library - adds token to HttpOnly cookie
  //   req.session.token = token;
  //   // @TODO: dont sent token back - only for setting up purpose for now
  //   return res.status(200).json({ token, user: "tester" });
  // } else {
  //   return res.status(401).json({ msg: "Invalid credentials" });
  // }
};

const verifyCookieExist = async (req, res, next) => {
  // A token will be present in req.session which we stored inside HttpOnly cookie.
  // req.header.cookie will never return anything so do not use
  if (req.cookies["jwt"]) {
    return res.status(200).send(true);
  } else {
    return res.status(200).send(false);
  }
};

const logout = async (req, res, next) => {
  // req.session = null;
  res.clearCookie("jwt");
  return res.status(200).json({});
};

module.exports = {
  validateLogin,
  logout,
  verifyCookieExist,
};
