const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require('express-session');


mongoose.connect("mongodb://127.0.0.1:27017/express-blog");


const Post = require('./app/models/PostModel')

const blogRouter = require('./app/router/blogRouter');
const blogApiRouter = require('./app/router/blogApiRouter');
const userRouter = require('./app/router/userRouter');
const userApiRouter = require('./app/router/userApiRouter');

const authMiddleware = require('./app/middlewares/authMiddleware');
const authApiMiddleware = require('./app/middlewares/authApiMiddleware');

app.use("/files", express.static("public"));

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());


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
app.use("/blog", authMiddleware, blogRouter);
app.use("/user", userRouter);

/* API Routes*/ 
app.use("/api/posts", authApiMiddleware, blogApiRouter);
app.use("/api/user", userApiRouter);


app.listen(8080, function () {
  console.log("Serwer Node.js działa");
});
