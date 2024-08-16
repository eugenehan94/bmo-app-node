const mySqlConnection = require("../../../libraries/mysql");
const transferFunds = async (req, res, next) => {
  console.log("result: ", req.body);
  const {
    fromAccountAmount,
    fromAccount,
    toAccountAmount,
    toAccount,
    customerId,
  } = req.body;

  let userAccounts;

  mySqlConnection.query(
    `UPDATE bmo_project.accounts SET Amount=${fromAccountAmount} WHERE AccountNumber=${fromAccount} AND CustomerID=${customerId}`
  );
  mySqlConnection.query(
    `UPDATE bmo_project.accounts SET Amount=${toAccountAmount} WHERE AccountNumber=${toAccount} AND CustomerID=${customerId}`
  );
  mySqlConnection.query(
    `SELECT * FROM bmo_project.accounts WHERE CustomerID = ${customerId}`,
    (error, result) => {
      userAccounts = result;
      console.log("userAccounts: ", userAccounts);

      return res.status(200).json({ userAccounts: userAccounts });
    }
  );
};

module.exports = {
  transferFunds,
};
