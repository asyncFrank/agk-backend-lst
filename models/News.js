const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  news_date: {
    type: String,
    required: true,
  },
  obs: {
    type: String,
  },
  contato_sacci:{
    type:String
  },
  relevance: {
    type: Number,
    required: true,
  },
  url_image_noticia:{
    type:String
  },
  cultura:{
    type:String
  },
  city:{
    type:String
  },
  state:{
    type:String
  },
  description:{
    type:String,
  },
  link:{
    type:String
  },
  update_frequency:{
    type:String
  }

});

module.exports = mongoose.model("news", newsSchema);
