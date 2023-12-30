const {
  heroBannerOptions,
  footerCategoryLinks,
  aboutBmoData,
  footerCaptions,
  buttonsData,
  buttonsDisplayContents,
  navigationOptions,
  tabs,
  cardContent,
} = require("../../mocks/business/home");

const getHeroBannerOptions = async (req, res, next) => {
  try {
    res.status(200).json(heroBannerOptions);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const getFooterCategoryLinks = async (req, res, next) => {
  try {
    res.status(200).json(footerCategoryLinks);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const getAboutBmoData = async (req, res, next) => {
  try {
    res.status(200).json(aboutBmoData);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const getFooterCaptions = (req, res, next) => {
  try {
    res.status(200).json(footerCaptions);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const getButtonsData = (req, res, next) => {
  try {
    res.status(200).json(buttonsData);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const getButtonsDisplayContents = (req, res, next) => {
  try {
    res.status(200).json(buttonsDisplayContents);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const getNavigationOptions = (req, res, next) => {
  try {
    res.status(200).json(navigationOptions);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const getTabs = (req, res, next) => {
  try {
    res.status(200).json(tabs);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const getCardContent = (req, res, next) => {
  try {
    res.status(200).json(cardContent);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};
module.exports = {
  getHeroBannerOptions,
  getFooterCategoryLinks,
  getAboutBmoData,
  getFooterCaptions,
  getButtonsData,
  getButtonsDisplayContents,
  getNavigationOptions,
  getTabs,
  getCardContent,
};
