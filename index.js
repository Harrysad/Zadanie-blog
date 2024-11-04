const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/express-blog");


const Post = require('./app/models/PostModel')

const blogRouter = require('./app/router/blogRouter');
const userRouter = require('./app/router/userRouter');

app.use("/files", express.static("public"));

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({extended: true}));

app.get("/mongoose/:id", function (req, res) {
  Post.findById(req.params.id).then((post)=>{
    res.render("home", {
      title: post.title,
      content: post.content,
      displayTitle: true,
      names: ["Adam", "Ola", "Kasia", "Tomek"],
    });
  }).catch((err)=>{
    res.send(err)
  })
  
});

app.get("/", function (_req, res) {
  res.render("home", {
    title: "My app title",
    content: "Lorem ipsum",
    displayTitle: true,
    names: ["Adam", "Ola", "Kasia", "Tomek"],
  });
});

/* Routes */
app.use("/blog", blogRouter);
app.use("/user", userRouter);


app.listen(8080, function () {
  console.log("Serwer Node.js działa");
});
