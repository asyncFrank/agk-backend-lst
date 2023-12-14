const router = require("express").Router();

const News = require("../models/News");

router.get("/news", async (req, res) => {
  try {
    const term = req.query.term ? req.query.term + "*" : "";

       const news = await News.find({
      
      cultura: { $regex: term, $options: "i" },
    }).sort({ date: -1});
    // console.log(news);
    const total = await News.countDocuments({
      cultura: { $regex: term, $options: "i" },
    });

    const response = {
      error: false,
      total,

      news,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

router.get("/news/article", async (req, res) => {
  try {
    const newsId = req.query.newsId;

    const newsArticle = await News.findById(newsId);

    const response = newsArticle;
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});
module.exports = router;
