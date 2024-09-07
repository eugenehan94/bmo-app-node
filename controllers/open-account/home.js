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
    console.log("firstName: ", firstName, " lastName: ", lastName);

    let randomPassword = generateRandomText(4);
    let randomCardNumber = await uniqueCardNumber();

    mySqlConnection.query(
      `INSERT INTO bmo_project.customer (LastName, FirstName, CardNumber, Password) VALUES ("${lastName}", "${firstName}", ${randomCardNumber}, "${randomPassword}")`,
      (error, result) => {
        if (error) {
          console.log("error: ", error);
        }
      }
    );

    // Get Id from database and create two random accounts with random amounts
    mySqlConnection.query(
      `SELECT CustomerID FROM bmo_project.customer WHERE CardNumber =${randomCardNumber} `,
      (error1, results1) => {
        if (error1) {
          throw error1;
        }
        let randomAmountOne = Math.floor(Math.random() * 1000) + 1;
        let randomAmountTwo = Math.floor(Math.random() * 100) + 1;
        //
        console.log("result1: ", results1);
        console.log("result1: ", results1[0].CustomerID);
        // mySqlConnection.query(
        //   `INSERT INTO bmo_project.accounts (CustomerID, Amount, AccountType, AccountNumber) VALUES (${results1}, ${randomAmountOne}, 'Chequing', 1234 )`
        // );

        // mySqlConnection.query(
        //   `INSERT INTO bmo_project.accounts (CustomerID, Amount, AccountType, AccountNumber) VALUES (${results1}, ${randomAmountTwo}, 'Saving', 1234 )`
        // );
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
          console.log("Error");
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
module.exports = {
  createAccount,
};
