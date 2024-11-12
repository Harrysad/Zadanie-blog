const express = require('express');
const router = express.Router();

const userController = require('../api/UserApiController');
const userApiController = require('../api/UserApiController');

router.post('/signup', userApiController.create);
router.post('/login', userApiController.login);

module.exports = router;