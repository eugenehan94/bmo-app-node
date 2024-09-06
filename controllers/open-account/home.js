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
    console.log("req: ", req.body);
    let randomCardNumber = Math.floor(Math.random() * 10000) + 1;
    console.log("random card number:", randomCardNumber);
    let randomPassword = generateRandomText(4);
    console.log("random password: ", randomPassword);
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

module.exports = {
  createAccount,
};
