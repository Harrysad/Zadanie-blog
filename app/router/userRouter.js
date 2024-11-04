const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/signup', (_req, res) => {
    res.render('userViews/singupUser')
});

router.post('/signup', userController.create);

module.exports = router;