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

app.route("/articles/:singlePost")
  .get((req, res) => {
    Article.findOne({title: req.params.singlePost}, (err, post) => {

      if (!err) {
        if (post) {
          res.send(post);
        } else {
          res.send("No articles matching this title were found.");
        }
      } else {
        res.send(err);
      }
    });
  })
  .put((req, res) => {
    Article.update(
      {title: req.params.singlePost},
      {title: req.body.title, content: req.body.content},
      {overwrite: true},
      err => {
      if (!err) {
        res.send("Successfully changed the article!");
      } else {
        res.send(err);
      }
    })
  })
  .patch((req, res) => {
    Article.update(
      {title: req.params.singlePost},
      {$set: req.body},
      err => {
      if (!err) {
        res.send("Successfully updated the article!");
      } else {
        res.send(err);
      }
    })
  })
  .delete((req, res) => {
    Article.deleteOne({title: req.params.singlePost}, err => {
      if (!err) {
        res.send("Successfully deleted the article.");
      } else {
        res.send(err);
      }
    })
  });


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
