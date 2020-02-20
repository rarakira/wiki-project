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

mongoose.connect("mongodb://localhost:27017/todolistDB", {
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

app.get("/", (req, res) => {
  console.log("Hello world!");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
