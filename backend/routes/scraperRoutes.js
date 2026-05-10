const express = require("express");
const scrapeStories = require("../utils/scraper");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    await scrapeStories();
    res.json({ message: "Scraper executed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
