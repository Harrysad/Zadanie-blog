const Post = require('../models/PostModel');

module.exports = {
    index: (req, res) => {
        Post.find({})
            .lean()
            .then((posts) => {
                res.render("blogViews/blog", { posts: posts });
            })
            .catch((err) => {
                res.send(err)
            })
    },
    post: (req, res) => {
        Post.findById(req.params.id)
            .then((post) => {
                res.render("blogViews/singlePost", post);
            })
            .catch((err) => {
                res.send(err);
            });
    },
    create: (req, res) => {
        const newPost = new Post({ ...req.body, author: "Misio" });
        newPost.save();

        res.redirect("/blog");
    },
    update: (req, res) => {
        Post.findByIdAndUpdate(req.params.id, req.body)
            .then((post) => {
                res.redirect("/blog/" + post._id);
            })
            .catch((err) => {
                res.send(err);
            });
    },
    delete: (req, res) => {
        Post.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect("/blog");
            })
            .catch((err) => {
                res.send(err);
            });
    },
    editForm: (req, res) => {
        Post.findById(req.params.id)
            .then((post) => {
                res.render("blogViews/editPost", post);
            })
            .catch((err) => {
                res.send(err);
            });
    },
};
