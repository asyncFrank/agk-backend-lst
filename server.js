require("dotenv").config();
const express = require("express");
// const dbConnect = require("./dbConnect");
const mongoose = require("mongoose");
const movieRoutes = require("./routers/movies");
const contactRoutes = require("./routers/contacts")
const newsRoutes = require("./routers/news")

const cors = require("cors");
const app = express();

// dbConnect();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("Conectado no MONGODB");
  });

app.use("/api", movieRoutes);
app.use("/api", contactRoutes);
app.use("/api", newsRoutes);
const port = process.env.port || 8080;

app.listen(port, () => console.log("escutando em " + port));
