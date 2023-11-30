const router = require("express").Router();

const News = require("../models/News");

router.get("/news", async (req, res) => {
  try {
    const term = req.query.term ? req.query.term + "*" : "";

    // let cultivations = req.query.cultivations || "TODAS";

    // const cultivationsOptions = [
    //   "ALGODÃO",
    //   "ARROZ",
    //   "BATATA",
    //   "CAFÉ",
    //   "CANA",
    //   "FEIJÃO",
    //   "FUMO",
    //   "HORTIFRUTI",
    //   "MANDIOCA",
    //   "MILHO",
    //   "SOJA",
    //   "TOMATE",
    //   "TRIGO",
    //   "OUTROS",
    //   "NI",
    // ];
    // cultivations === "TODAS"
    //   ? (cultivations = [...cultivationsOptions])
    //   : (cultivations = req.query.cultivations.split(","));
    // req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    // let sortBy = {};
    // if (sort.length > 0) {
    //   sortBy[sort[0]] = sort[1];
    // } else {
    //   sortBy[sort[0]] = "asc";
    // }

    const news = await News.find({
      cultura: { $regex: term, $options: "i" },
    });

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
