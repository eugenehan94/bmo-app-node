const express = require("express");
const router = express.Router();
const {
  getHeroBannerOptions,
  getFooterCategoryLinks,
  getAboutBmoData,
  getFooterCaptions,
  getButtonsData,
  getButtonsDisplayContents,
  getNavigationOptions,
  getTabs,
  getCardContent,
} = require("../controllers/business/home");

router.get("/hero", getHeroBannerOptions);
router.get("/get-in-touch-buttons-data", getButtonsData);
router.get("/get-in-touch-buttons-display-content", getButtonsDisplayContents);
router.get("/navigation-options", getNavigationOptions);
router.get("/products-tabs", getTabs);
router.get("/where-to-begin", getCardContent);
router.get("/footer/category-links", getFooterCategoryLinks);
router.get("/footer/about-bmo", getAboutBmoData);
router.get("/footer/captions", getFooterCaptions);

module.exports = router;
