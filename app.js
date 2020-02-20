const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0-xh2y4.gcp.mongodb.net/wikiDB`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
  .get((req, res) => {

    Article.find((err, allArticles) => {
      if (!err) {
        res.send(allArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(err => {
      if (err) {
        res.send(err);
      } else {
        res.send("The article was added successfully!");
      }
    });

  })
  .delete((req, res) => {
    Article.deleteMany(err => {
      if (!err) {
        res.send("The collection was deleted successfully.");
      } else {
        res.send(err);
      }
    });
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
