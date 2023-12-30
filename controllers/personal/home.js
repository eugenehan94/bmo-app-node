const {
  heroBannerOptions,
  productsTabs,
  cardContent,
  footerCategoryLinks,
  footerAboutBmoData,
  navbarNavigationOptions,
} = require("../../mocks/personal/home");

const getHeroBannerOptions = async (req, res, next) => {
  try {
    res.status(200).json(heroBannerOptions);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const getProductsTabs = async (req, res, next) => {
  try {
    res.status(200).json(productsTabs);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const getWhereToBeginCards = async (req, res, next) => {
  try {
    res.status(200).json(cardContent);
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

const getFooterAboutBmoData = async (req, res, next) => {
  try {
    res.status(200).json(footerAboutBmoData);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};
const getNavbarNavigationOptions = async (req, res, next) => {
  try {
    res.status(200).json(navbarNavigationOptions);
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};
module.exports = {
  getHeroBannerOptions,
  getProductsTabs,
  getWhereToBeginCards,
  getFooterCategoryLinks,
  getFooterAboutBmoData,
  getNavbarNavigationOptions,
};
