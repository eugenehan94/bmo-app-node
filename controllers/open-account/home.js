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
    console.log("random password: ", randomPassword);
    uniqueCardNumber();
    res.status(200).json({ msg: "User created" });
    // Check if randomCardNumber is unique in database

    // const createUser = await mySqlConnection.execute(
    //   `INSERT INTO bmo_project.customer (LastName, FirstName, CardNumber, Password) VALUES (${lastName}, ${firstName}, ${randomCardNumber}, ${randomPassword})`
    // );
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const uniqueCardNumber = async () => {
  mySqlConnection.query(
    `SELECT CardNumber FROM bmo_project.customer`,
    (error, result) => {
      if (error) {
        console.log("Error");
        throw error;
      }
      let isUnique = false;
      let randomCardNumber;
      // while (!isUnique) {
      //   randomCardNumber = Math.floor(Math.random() * 10000) + 1;
      // }
      for (let i = 0; i < result.length; i++) {
        console.log("for loop results: ", result[i].CardNumber);
        console.log("logic test: ", result[i].CardNumber === 123);
      }
      console.log("table results: ", result);
    }
  );
};
module.exports = {
  createAccount,
};
