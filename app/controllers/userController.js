const Post = require('../models/UserModel');


module.exports = {
    create: (req, res) => {
        const newUser = User(req.body);
        newUser.save();

        res.redirect('/blog');
    }
}