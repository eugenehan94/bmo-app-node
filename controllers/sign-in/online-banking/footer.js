const {
  footerContentOne,
  footerContentTwo,
} = require("../../../mocks/sign-in");

const getFooterContentOne = async (req, res, next) => {
  try {
    res.status(200).json(footerContentOne);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const getFooterContentTwo = async (req, res, next) => {
  try {
    res.status(200).json(footerContentTwo);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

module.exports = {
  getFooterContentOne,
  getFooterContentTwo,
};
