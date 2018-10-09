const db = require("../models");

module.exports = {
  create: function(req, res) {
    db.Article
      .create(req.body)
      .then(data => res.json(data))
      .catch(err => console.log(err))
  },
  findAll: function(req, res) {
    db.Article
      .find({})
      .then(data => res.json(data))
      .catch(err => console.log(err))
  },
  delete: function(req, res) {
    db.Article
      .findByIdAndDelete({ _id: req.params.id })
      .then(data => res.json(data))
      .catch(err => console.log(err))
  }
}