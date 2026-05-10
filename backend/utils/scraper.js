const axios = require("axios");
const cheerio = require("cheerio");
const Story = require("../models/Story");

const scrapeStories = async () => {
  try {
    const { data } = await axios.get("https://news.ycombinator.com");

    const $ = cheerio.load(data);

    const stories = [];

    $(".athing").each((index, element) => {
      if (index >= 10) return false;

      const title = $(element).find(".titleline a").first().text();
      const url = $(element).find(".titleline a").first().attr("href");

      const subtext = $(element).next();

      const points = parseInt(subtext.find(".score").text()) || 0;
      const author = subtext.find(".hnuser").text();
      const postedAtRaw = subtext.find(".age").attr("title") || "";
      const postedAt = postedAtRaw
        ? postedAtRaw.split(" ")[0]
        : subtext.find(".age").text();

      stories.push({ title, url, points, author, postedAt });
    });

    await Story.deleteMany();
    await Story.insertMany(stories);

    console.log("Stories scraped successfully");
  } catch (error) {
    console.log("Server error:", error.message);
  }
};

module.exports = scrapeStories;
