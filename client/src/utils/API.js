import axios from "axios";

export default {
  getNewArticles: function(topic, startDate, endDate) {
    let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api_key=8583aeb1e26848c2a893661a0c89eb27&fl=headline,byline,web_url"
    url += ("&q=" + topic)
    url += ("&begin_date=" + startDate)
    url += ("&end_date=" + endDate)

    return axios.get(url);
  },

  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData)
  },

  getSavedArticles: function() {
    return axios.get("/api/articles")
  },

  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id)
  }
};
