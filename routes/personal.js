const express = require("express");
const router = express.Router();
const {
  getHeroBannerOptions,
  getProductsTabs,
  getWhereToBeginCards,
  getFooterCategoryLinks,
  getFooterAboutBmoData,
  getNavbarNavigationOptions,
} = require("../controllers/personal/home");

router.get("/hero", getHeroBannerOptions);
router.get("/products-tabs", getProductsTabs);
router.get("/where-to-begin", getWhereToBeginCards);
router.get("/navigation-options", getNavbarNavigationOptions);
router.get("/footer/category-links", getFooterCategoryLinks);
router.get("/footer/about-bmo", getFooterAboutBmoData);

module.exports = router;
