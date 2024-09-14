const mySqlConnection = require("../../libraries/mysql");

const generateRandomText = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const createAccount = async (req, res, next) => {
  try {
    const { firstName, lastName } = req.body;

    let randomPassword = generateRandomText(4);
    let randomCardNumber = await uniqueCardNumber();

    mySqlConnection.query(
      `INSERT INTO bmo_project.customer (LastName, FirstName, CardNumber, Password) VALUES ("${lastName}", "${firstName}", ${randomCardNumber}, "${randomPassword}")`,
      (error, result) => {
        if (error) {
          res
            .status(500)
            .json({ error: "Database error", message: error.message });
        }
      }
    );

    // Get Id from database and create two random accounts with random amounts
    mySqlConnection.query(
      `SELECT CustomerID FROM bmo_project.customer WHERE CardNumber =${randomCardNumber} `,
      async (error1, results1) => {
        if (error1) {
          res
            .status(500)
            .json({ error: "Database error", message: error1.message });
        }
        let randomAmountOne = Math.floor(Math.random() * 1000) + 1;
        let randomAmountTwo = Math.floor(Math.random() * 100) + 1;
        let randomAccountNumber = await uniqueAccountNumber();
        let randomAccountNumberTwo = await uniqueAccountNumber();

        mySqlConnection.query(
          `INSERT INTO bmo_project.accounts (CustomerID, Amount, AccountType, AccountNumber) VALUES (${results1[0].CustomerID}, ${randomAmountOne}, 'Chequing', '${randomAccountNumber}' )`,
          (error, result) => {
            if (error) {
              res
                .status(500)
                .json({ error: "Database error", message: error.message });
            }
          }
        );

        mySqlConnection.query(
          `INSERT INTO bmo_project.accounts (CustomerID, Amount, AccountType, AccountNumber) VALUES (${results1[0].CustomerID}, ${randomAmountTwo}, 'Saving', '${randomAccountNumberTwo}' )`,
          (error, result) => {
            if (error) {
              res
                .status(500)
                .json({ error: "Database error", message: error.message });
              throw error;
            }
          }
        );
      }
    );
    res.status(200).json({ msg: "User created" });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const uniqueCardNumber = async () => {
  let randomCardNumber;

  return new Promise((resolve, reject) => {
    mySqlConnection.query(
      `SELECT CardNumber FROM bmo_project.customer`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          let isUnique = false;

          while (!isUnique) {
            randomCardNumber = Math.floor(Math.random() * 10000) + 1;
            for (let i = 0; i < result.length; i++) {
              if (result[i].CardNumber === randomCardNumber) {
                isUnique = false;
                break;
              } else {
                isUnique = true;
              }
            }
          }
          resolve(randomCardNumber);
        }
      }
    );
  });
};

const uniqueAccountNumber = async () => {
  let randomAccountNumber;

  return new Promise((resolve, reject) => {
    mySqlConnection.query(
      `SELECT AccountNumber FROM bmo_project.accounts`,
      (error, result) => {
        if (error) {
          throw error;
          reject(error);
        } else {
          let isUnique = false;
          while (!isUnique) {
            randomAccountNumber = Math.floor(Math.random() * 100000) + 1;
            for (let i = 0; i < result.length; i++) {
              if (result[i].AccountNumber === randomAccountNumber) {
                isUnique = false;
                break;
              } else {
                isUnique = true;
              }
            }
          }
          resolve(randomAccountNumber);
        }
      }
    );
  });
};
module.exports = {
  createAccount,
};
