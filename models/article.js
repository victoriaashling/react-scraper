const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  headline: { type: STRING, required: true },
  url: { type: STRING, required: true },
  byline: STRING
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;